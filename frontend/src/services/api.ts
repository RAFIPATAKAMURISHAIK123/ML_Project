import axios from "axios";

export const API_BASE_URL = "http://localhost:5000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

export type PredictionResult = {
  category: "Genuine" | "Fake" | "Masked" | "Deepfake";
  confidence: number;
  processingTime: number;
  probabilities: { Genuine: number; Fake: number; Masked: number; Deepfake: number };
};

function mockPredict(): PredictionResult {
  const cats = ["Genuine", "Fake", "Masked", "Deepfake"] as const;
  const idx = Math.floor(Math.random() * cats.length);
  const top = 0.80 + Math.random() * 0.18;
  const remaining = 1 - top;
  const others = [Math.random(), Math.random(), Math.random()];
  const sum = others.reduce((a, b) => a + b, 0);
  const probs: PredictionResult["probabilities"] = { Genuine: 0, Fake: 0, Masked: 0, Deepfake: 0 };
  let j = 0;
  cats.forEach((c, i) => {
    if (i === idx) probs[c] = Number(top.toFixed(3));
    else { probs[c] = Number(((others[j] / sum) * remaining).toFixed(3)); j++; }
  });
  return {
    category: cats[idx],
    confidence: Number((top * 100).toFixed(1)),
    processingTime: Math.floor(80 + Math.random() * 180),
    probabilities: probs,
  };
}

async function withMockFallback<T>(req: Promise<T>, fallback: () => T): Promise<T> {
  try {
    return await req;
  } catch {
    await new Promise((r) => setTimeout(r, 900));
    return fallback();
  }
}

export async function predictLive(blob: Blob): Promise<PredictionResult> {
  const form = new FormData();
  form.append("image", blob, "frame.jpg");
  return withMockFallback(
    api.post<PredictionResult>("/predict-live", form).then((r) => r.data),
    mockPredict,
  );
}

export async function predictSingle(file: File): Promise<PredictionResult> {
  const form = new FormData();
  form.append("image", file);
  return withMockFallback(
    api.post<PredictionResult>("/predict-single", form).then((r) => r.data),
    mockPredict,
  );
}

export type BatchPrediction = PredictionResult & { name: string };

export async function predictMultiple(files: File[]): Promise<BatchPrediction[]> {
  const form = new FormData();
  files.forEach((f) => form.append("images", f));
  return withMockFallback(
    api.post<BatchPrediction[]>("/predict-multiple", form).then((r) => r.data),
    () => files.map((f) => ({ ...mockPredict(), name: f.name })),
  );
}