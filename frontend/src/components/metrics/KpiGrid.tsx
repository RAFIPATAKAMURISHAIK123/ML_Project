import { Target, Crosshair, Repeat2, Sigma, Database, Layers } from "lucide-react";
import { KpiCard } from "./KpiCard";
import { METRICS } from "@/lib/metrics";

export function KpiGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      <KpiCard label="Accuracy" value={METRICS.accuracy} suffix="%" icon={Target} delay={0} />
      <KpiCard label="Precision" value={METRICS.precision} suffix="%" icon={Crosshair} delay={0.05} />
      <KpiCard label="Recall" value={METRICS.recall} suffix="%" icon={Repeat2} delay={0.1} />
      <KpiCard label="F1 Score" value={METRICS.f1} suffix="%" icon={Sigma} delay={0.15} />
      <KpiCard label="Dataset Size" value={METRICS.totalSamples.toLocaleString()} icon={Database} delay={0.2} />
      <KpiCard label="Categories" value={METRICS.categories} icon={Layers} delay={0.25} />
    </div>
  );
}