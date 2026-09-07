# NeuroFace demo backend

This FastAPI service exists only to integrate the completed frontend while the
real ML artifacts are unavailable. `/health` explicitly reports
`model_status: not_loaded`; prediction results are repeatable mock values based
on the image bytes, not model inference.

Run from this directory:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --host 127.0.0.1 --port 5000
```

The existing frontend sends one image under `image`, and batches under `images`.
When the real model artifacts are supplied, replace the demo predictor only
after verifying its actual inference pipeline.
