export const METRICS = {
  accuracy: 94,
  precision: 94,
  recall: 94,
  f1: 94,
  totalSamples: 4500,
  categories: 4,
};

export type ClassName = "Genuine" | "Fake" | "Masked" | "Deepfake";

export const CLASS_REPORT: Array<{
  class: ClassName;
  precision: number;
  recall: number;
  f1: number;
  support: number;
}> = [
  { class: "Genuine", precision: 0.95, recall: 0.94, f1: 0.95, support: 1200 },
  { class: "Fake", precision: 0.92, recall: 0.93, f1: 0.92, support: 1100 },
  { class: "Masked", precision: 0.94, recall: 0.95, f1: 0.95, support: 1150 },
  { class: "Deepfake", precision: 0.93, recall: 0.92, f1: 0.92, support: 1050 },
];

export const CATEGORY_COUNTS = [
  { name: "Genuine", value: 1200 },
  { name: "Fake", value: 1100 },
  { name: "Masked", value: 1150 },
  { name: "Deepfake", value: 1050 },
];

export const CATEGORY_COLORS: Record<ClassName, string> = {
  Genuine: "oklch(0.72 0.18 155)",
  Fake: "oklch(0.70 0.20 25)",
  Masked: "oklch(0.72 0.18 200)",
  Deepfake: "oklch(0.65 0.22 305)",
};

export const PERFORMANCE_BARS = CLASS_REPORT.map((c) => ({
  name: c.class,
  Precision: Math.round(c.precision * 100),
  Recall: Math.round(c.recall * 100),
  F1: Math.round(c.f1 * 100),
}));

export const PREDICTION_TRENDS = [
  { day: "Mon", predictions: 320, accuracy: 93 },
  { day: "Tue", predictions: 410, accuracy: 94 },
  { day: "Wed", predictions: 380, accuracy: 95 },
  { day: "Thu", predictions: 520, accuracy: 94 },
  { day: "Fri", predictions: 610, accuracy: 95 },
  { day: "Sat", predictions: 470, accuracy: 93 },
  { day: "Sun", predictions: 540, accuracy: 94 },
];