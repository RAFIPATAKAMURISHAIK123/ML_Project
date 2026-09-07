"""Demo-only API for the NeuroFace frontend.

This module deliberately does not load or claim to use a machine-learning
model.  Replace the demo predictor only after the real saved artifacts and
their verified inference pipeline are available.
"""

from __future__ import annotations

import hashlib
import io
import os
import time
from contextlib import asynccontextmanager
from typing import Annotated

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError


CLASSES = ("Genuine", "Fake", "Masked", "Deepfake")
MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE_MB", "10")) * 1024 * 1024
ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp", "image/bmp"}

CLASS_REPORT = [
    {"class": "Genuine", "precision": 0.95, "recall": 0.94, "f1": 0.95, "support": 1200},
    {"class": "Fake", "precision": 0.92, "recall": 0.93, "f1": 0.92, "support": 1100},
    {"class": "Masked", "precision": 0.94, "recall": 0.95, "f1": 0.95, "support": 1150},
    {"class": "Deepfake", "precision": 0.93, "recall": 0.92, "f1": 0.92, "support": 1050},
]


@asynccontextmanager
async def lifespan(_: FastAPI):
    # Kept explicit so deployment status cannot ever be mistaken for a loaded model.
    yield


app = FastAPI(
    title="NeuroFace Demo API",
    version="0.1.0-demo",
    description="Frontend integration API. Predictions are deterministic mock data, not ML inference.",
    lifespan=lifespan,
)

origins = [item.strip() for item in os.getenv("FRONTEND_URL", "http://localhost:5173").split(",") if item.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def error(status_code: int, message: str, code: str) -> HTTPException:
    return HTTPException(status_code=status_code, detail={"success": False, "error": message, "error_code": code})


async def read_image(upload: UploadFile) -> bytes:
    if upload.content_type and upload.content_type not in ALLOWED_TYPES:
        raise error(415, "Unsupported image format", "UNSUPPORTED_IMAGE_FORMAT")
    payload = await upload.read(MAX_FILE_SIZE + 1)
    if not payload:
        raise error(400, "The uploaded image is empty", "EMPTY_UPLOAD")
    if len(payload) > MAX_FILE_SIZE:
        raise error(413, "Image exceeds the configured size limit", "FILE_TOO_LARGE")
    try:
        with Image.open(io.BytesIO(payload)) as image:
            image.verify()
    except (UnidentifiedImageError, OSError, ValueError) as exc:
        raise error(422, "The uploaded file is not a readable image", "INVALID_IMAGE") from exc
    return payload


def demo_prediction(payload: bytes, filename: str | None) -> dict[str, object]:
    """Return repeatable data for UI development; this is not a classifier."""
    started = time.perf_counter()
    digest = hashlib.sha256(payload).digest()
    winner = digest[0] % len(CLASSES)
    confidence = 80 + (digest[1] / 255) * 18
    remaining = 100 - confidence
    weights = [digest[2 + index] + 1 for index in range(3)]
    weight_sum = sum(weights)
    probabilities: dict[str, float] = {}
    other_index = 0
    for index, category in enumerate(CLASSES):
        if index == winner:
            probabilities[category] = round(confidence, 1)
        else:
            probabilities[category] = round(remaining * weights[other_index] / weight_sum, 1)
            other_index += 1
    # Preserve a 100.0 total after decimal rounding.
    probabilities[CLASSES[winner]] = round(probabilities[CLASSES[winner]] + (100 - sum(probabilities.values())), 1)
    result: dict[str, object] = {
        "category": CLASSES[winner],
        "confidence": probabilities[CLASSES[winner]],
        "processingTime": max(1, round((time.perf_counter() - started) * 1000)),
        "probabilities": probabilities,
        "demo_mode": True,
    }
    if filename is not None:
        result["name"] = filename
    return result


@app.get("/", summary="Service information")
async def root() -> dict[str, object]:
    return {"success": True, "message": "NeuroFace demo API is running", "version": "0.1.0-demo", "demo_mode": True}


@app.get("/health", summary="Backend and model status")
async def health() -> dict[str, object]:
    return {
        "status": "degraded",
        "model_status": "not_loaded",
        "model_name": None,
        "demo_mode": True,
        "error": "Saved model artifacts are unavailable; prediction responses are demo data.",
    }


@app.get("/model-info", summary="Model availability")
async def model_info() -> dict[str, object]:
    return {
        "success": True,
        "model_status": "not_loaded",
        "model_name": None,
        "model_type": None,
        "classes": list(CLASSES),
        "num_classes": len(CLASSES),
        "demo_mode": True,
        "message": "No model artifacts are available. This backend is in demo mode.",
    }


@app.get("/metrics", summary="Static project evaluation metrics")
async def metrics() -> dict[str, object]:
    return {
        "success": True,
        "overall": {"accuracy": 94, "precision": 94, "recall": 94, "f1_score": 94},
        "dataset": {"total_samples": 4500, "num_classes": 4},
        "class_metrics": CLASS_REPORT,
        "class_distribution": {item["class"]: item["support"] for item in CLASS_REPORT},
    }


@app.get("/analytics", summary="Dashboard analytics")
async def analytics() -> dict[str, object]:
    return {**await metrics(), "model": await model_info(), "performance": {"mode": "demo", "inference_available": False}}


@app.post("/predict-single", summary="Demo prediction for one image")
async def predict_single(image: Annotated[UploadFile, File(description="Image selected in the frontend")]) -> dict[str, object]:
    return demo_prediction(await read_image(image), image.filename)


@app.post("/predict-live", summary="Demo prediction for a captured camera frame")
async def predict_live(image: Annotated[UploadFile, File(description="Captured image frame")]) -> dict[str, object]:
    return demo_prediction(await read_image(image), image.filename)


@app.post("/predict-multiple", summary="Demo predictions for multiple images")
async def predict_multiple(images: Annotated[list[UploadFile], File(description="One or more images")]) -> list[dict[str, object]]:
    if not images:
        raise error(400, "At least one image is required", "EMPTY_UPLOAD")
    results = []
    for image in images:
        results.append(demo_prediction(await read_image(image), image.filename))
    return results
