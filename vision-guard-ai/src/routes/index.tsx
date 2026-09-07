import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Camera, Image as ImageIcon, Images, Brain, Zap, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-ai.jpg";
import { KpiGrid } from "@/components/metrics/KpiGrid";
import { PerformanceBarChart } from "@/components/charts/PerformanceBarChart";
import { CategoryPieChart } from "@/components/charts/CategoryPieChart";
import { TrendLineChart } from "@/components/charts/TrendLineChart";
import { ClassificationTable } from "@/components/metrics/ClassificationTable";
import { ProgressBar } from "@/components/metrics/ProgressBar";
import { SectionHeader } from "@/components/common/SectionHeader";
import { METRICS } from "@/lib/metrics";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeuroFace AI — Face Recognition & Deepfake Detection" },
      { name: "description", content: "Deep-learning face recognition and deepfake detection across Genuine, Fake, Masked, and Deepfake classes. 94% accuracy on 4,500 samples." },
      { property: "og:title", content: "NeuroFace AI — Face Recognition & Deepfake Detection" },
      { property: "og:description", content: "Deep-learning face recognition with 94% accuracy." },
    ],
  }),
  component: Index,
});

const features = [
  { icon: Camera, title: "Live Camera Prediction", desc: "Real-time webcam capture & classification with sub-second inference." },
  { icon: ImageIcon, title: "Single Image Prediction", desc: "Upload one image and get class, confidence, and probability distribution." },
  { icon: Images, title: "Multiple Image Prediction", desc: "Batch-process entire folders, export results as CSV or PDF." },
  { icon: Brain, title: "Deep Learning Based", desc: "MTCNN face detection + CNN feature extraction + SVM classification." },
  { icon: Zap, title: "Real-time Processing", desc: "Optimized pipeline with average inference under 200 ms per image." },
  { icon: ShieldCheck, title: "Secure & Accurate", desc: "94% overall accuracy across 4 classes and 4,500 evaluated samples." },
];

const workflow = ["Face Detection", "Face Alignment", "Preprocessing", "Feature Extraction", "Classification", "Prediction"];

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary-glow" /> Deep Learning · MTCNN · CNN · SVM
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Face Recognition & <span className="text-gradient">Deepfake Detection</span> powered by AI
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Detect Genuine, Fake, Masked and Deepfake faces in real time. Production-grade classification with 94% accuracy on 4,500 evaluated samples.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/live" className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]">
                Start Prediction <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/analytics" className="inline-flex items-center gap-2 rounded-md border border-border bg-muted/40 px-5 py-3 text-sm font-medium hover:bg-muted">
                View Analytics
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-4 gap-3 text-center">
              {[{l:"Accuracy",v:"94%"},{l:"Samples",v:"4.5K"},{l:"Classes",v:"4"},{l:"F1",v:"94%"}].map((s) => (
                <div key={s.l} className="glass-card rounded-xl p-3">
                  <div className="text-xl font-bold text-gradient">{s.v}</div>
                  <div className="text-[11px] text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-hero opacity-30 blur-3xl" />
            <div className="glass-card relative overflow-hidden rounded-3xl">
              <img src={heroImg} alt="AI face recognition" className="h-full w-full object-cover" width={1536} height={1024} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* KPI */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <KpiGrid />
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Capabilities" title="Everything you need to detect synthetic faces" description="A complete pipeline — from capture to classification — engineered for accuracy and speed." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card group rounded-2xl p-6 transition-transform hover:-translate-y-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Workflow" title="From raw frame to confident prediction" />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {workflow.map((step, i) => (
            <motion.div key={step} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="glass-card rounded-xl p-4 text-center">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground">{i + 1}</div>
              <div className="mt-2 text-sm font-medium">{step}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Performance dashboard */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Performance" title="Model analytics at a glance" />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-lg font-semibold">Performance Comparison</h3>
            <PerformanceBarChart />
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-lg font-semibold">Category Distribution</h3>
            <CategoryPieChart />
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-lg font-semibold">Prediction Trends</h3>
            <TrendLineChart />
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-lg font-semibold">Overall Metrics</h3>
            <div className="space-y-4">
              <ProgressBar label="Accuracy" value={METRICS.accuracy} />
              <ProgressBar label="Precision" value={METRICS.precision} />
              <ProgressBar label="Recall" value={METRICS.recall} />
              <ProgressBar label="F1 Score" value={METRICS.f1} />
            </div>
          </div>
        </div>
      </section>

      {/* Classification report */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Report" title="Classification Report" description="Per-class precision, recall, F1 and support across all 4,500 samples." />
        <div className="mt-10"><ClassificationTable /></div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="glass-card rounded-2xl p-5"><p className="text-sm text-muted-foreground">Genuine & Masked classes achieve the highest <span className="text-foreground font-semibold">F1 Score (95%)</span>.</p></div>
          <div className="glass-card rounded-2xl p-5"><p className="text-sm text-muted-foreground">Fake & Deepfake classes achieve a strong <span className="text-foreground font-semibold">F1 Score (92%)</span>.</p></div>
          <div className="glass-card rounded-2xl p-5"><p className="text-sm text-muted-foreground">Overall model accuracy is <span className="text-foreground font-semibold">94%</span>, indicating reliable classification.</p></div>
        </div>
      </section>
    </div>
  );
}
