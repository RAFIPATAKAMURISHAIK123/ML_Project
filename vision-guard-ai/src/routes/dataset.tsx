import { createFileRoute } from "@tanstack/react-router";
import { Download, DownloadCloud } from "lucide-react";
import { motion } from "framer-motion";
import genuineImg from "@/assets/sample-genuine.jpg";
import fakeImg from "@/assets/sample-fake.jpg";
import maskedImg from "@/assets/sample-masked.jpg";
import deepfakeImg from "@/assets/sample-deepfake.jpg";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CategoryPieChart } from "@/components/charts/CategoryPieChart";
import { CATEGORY_COUNTS, METRICS } from "@/lib/metrics";
import { toast } from "sonner";

export const Route = createFileRoute("/dataset")({
  head: () => ({ meta: [{ title: "Sample Dataset — NeuroFace AI" }, { name: "description", content: "Browse dataset samples across Genuine, Fake, Masked, and Deepfake classes." }] }),
  component: Dataset,
});

const samples = [
  { name: "Genuine", img: genuineImg, count: 1200, desc: "Authentic, unaltered human face captures used as the positive baseline class." },
  { name: "Fake", img: fakeImg, count: 1100, desc: "Synthetically generated faces (GAN / diffusion) with subtle artifacts." },
  { name: "Masked", img: maskedImg, count: 1150, desc: "Faces with surgical or fabric masks — common real-world occlusion." },
  { name: "Deepfake", img: deepfakeImg, count: 1050, desc: "Identity-swapped or manipulated faces produced by deepfake pipelines." },
];

function download(name: string) {
  toast.success(`Sample download started: ${name}`);
}

function Dataset() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Dataset" title="Sample Dataset Showcase" description="A balanced 4,500-image dataset across 4 classes used to train and evaluate NeuroFace AI." />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {samples.map((s, i) => (
          <motion.div key={s.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card overflow-hidden rounded-2xl">
            <div className="aspect-square overflow-hidden bg-muted">
              <img src={s.img} alt={`${s.name} sample`} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{s.name}</h3>
                <span className="rounded-full bg-muted/60 px-2 py-0.5 text-xs">{s.count.toLocaleString()} samples</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <button onClick={() => download(s.name)} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-2 text-sm hover:bg-muted">
                <Download className="h-4 w-4" /> Download {s.name} Sample
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button onClick={() => download("Complete Dataset")} className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-glow">
          <DownloadCloud className="h-4 w-4" /> Download Complete Sample Dataset
        </button>
      </div>

      <div className="mt-16">
        <SectionHeader title="Dataset Analytics" />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="glass-card rounded-2xl p-6">
            <h4 className="mb-4 text-base font-semibold">Distribution</h4>
            <CategoryPieChart />
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h4 className="mb-4 text-base font-semibold">Dataset Statistics</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between border-b border-border/40 pb-2"><span className="text-muted-foreground">Total Images</span><span className="font-semibold">{METRICS.totalSamples.toLocaleString()}</span></li>
              <li className="flex justify-between border-b border-border/40 pb-2"><span className="text-muted-foreground">Number of Classes</span><span className="font-semibold">{METRICS.categories}</span></li>
              {CATEGORY_COUNTS.map((c) => (
                <li key={c.name} className="flex justify-between border-b border-border/40 pb-2 last:border-0"><span className="text-muted-foreground">{c.name}</span><span className="font-semibold">{c.value.toLocaleString()}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}