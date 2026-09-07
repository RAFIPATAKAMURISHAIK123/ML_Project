import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/common/SectionHeader";
import { KpiGrid } from "@/components/metrics/KpiGrid";
import { ClassificationTable } from "@/components/metrics/ClassificationTable";
import { PerformanceBarChart } from "@/components/charts/PerformanceBarChart";
import { CategoryPieChart } from "@/components/charts/CategoryPieChart";
import { ProgressBar } from "@/components/metrics/ProgressBar";
import { METRICS } from "@/lib/metrics";
import { Brain, ScanFace, Layers, Workflow, Database, Rocket } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — NeuroFace AI" },
      { name: "description", content: "Project overview, methodology, dataset, models (MTCNN, CNN, SVM) and performance for NeuroFace AI." },
      { property: "og:title", content: "About — NeuroFace AI" },
      { property: "og:description", content: "Methodology, dataset and performance overview." },
    ],
  }),
  component: About,
});

function Section({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow"><Icon className="h-5 w-5" /></div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="mt-3 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="About the project" title="Face Recognition and Deepfake Detection using Deep Learning" description="A complete deep-learning pipeline to classify faces as Genuine, Fake, Masked, or Deepfake — with 94% accuracy across 4,500 samples." />

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <Section icon={Brain} title="Project Overview">
          NeuroFace AI combines face detection, alignment, deep feature extraction and supervised classification to detect synthetic and manipulated faces in real time.
        </Section>
        <Section icon={ScanFace} title="Problem Statement">
          The rapid rise of deepfakes and synthetic media has made trustworthy face verification difficult. We need a fast, accurate, multi-class detector.
        </Section>
        <Section icon={Layers} title="Objectives">
          <ul className="list-disc space-y-1 pl-5">
            <li>Accurately classify 4 face categories</li>
            <li>Achieve ≥ 90% precision and recall per class</li>
            <li>Support live, single and batch prediction modes</li>
            <li>Deliver explainable probability distributions</li>
          </ul>
        </Section>
        <Section icon={Database} title="Dataset Information">
          4,500 labeled images across Genuine (1,200), Fake (1,100), Masked (1,150) and Deepfake (1,050) classes, split into train, validation and test sets.
        </Section>
        <Section icon={Workflow} title="Methodology">
          MTCNN for face detection & alignment → CNN for deep feature extraction → SVM for final multi-class classification with softmax confidence scoring.
        </Section>
        <Section icon={Rocket} title="Technologies Used">
          Python, TensorFlow / Keras, OpenCV, MTCNN, scikit-learn, FastAPI, React (Vite), Tailwind CSS, Recharts, Framer Motion.
        </Section>
      </div>

      <div className="mt-16">
        <SectionHeader title="Workflow" />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {["Face Detection","Face Alignment","Preprocessing","Feature Extraction","Classification","Prediction"].map((s, i) => (
            <div key={s} className="glass-card rounded-xl p-4 text-center">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground">{i + 1}</div>
              <div className="mt-2 text-sm font-medium">{s}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <SectionHeader title="Models & Categories" />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="glass-card rounded-2xl p-6">
            <h4 className="text-base font-semibold">Models Used</h4>
            <ul className="mt-3 grid grid-cols-3 gap-3 text-center text-sm">
              {["MTCNN","CNN","SVM"].map((m) => (
                <li key={m} className="rounded-xl border border-border bg-muted/30 p-4 font-semibold text-gradient">{m}</li>
              ))}
            </ul>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h4 className="text-base font-semibold">Categories</h4>
            <ul className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              {["Genuine","Fake","Masked","Deepfake"].map((c) => (
                <li key={c} className="rounded-xl border border-border bg-muted/30 p-4 text-center font-medium">{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <SectionHeader title="Performance Metrics" />
        <div className="mt-8"><KpiGrid /></div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="glass-card rounded-2xl p-6">
            <h4 className="mb-4 text-base font-semibold">Performance Comparison</h4>
            <PerformanceBarChart />
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h4 className="mb-4 text-base font-semibold">Dataset Distribution</h4>
            <CategoryPieChart />
          </div>
          <div className="glass-card rounded-2xl p-6 lg:col-span-2">
            <h4 className="mb-4 text-base font-semibold">Overall Metrics</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <ProgressBar label="Accuracy" value={METRICS.accuracy} />
              <ProgressBar label="Precision" value={METRICS.precision} />
              <ProgressBar label="Recall" value={METRICS.recall} />
              <ProgressBar label="F1 Score" value={METRICS.f1} />
            </div>
          </div>
        </div>
        <div className="mt-8"><ClassificationTable /></div>
      </div>

      <div className="mt-16 glass-card rounded-2xl p-8">
        <h3 className="text-xl font-bold">Future Scope</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <li>• Expand dataset to 20K+ images with diverse demographics</li>
          <li>• Add explainability with Grad-CAM heatmaps</li>
          <li>• Real-time video deepfake detection (temporal CNN + LSTM)</li>
          <li>• Edge deployment with TensorFlow Lite / WebGPU</li>
        </ul>
      </div>
    </div>
  );
}