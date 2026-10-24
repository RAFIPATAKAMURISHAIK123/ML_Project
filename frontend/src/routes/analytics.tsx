import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/common/SectionHeader";
import { KpiGrid } from "@/components/metrics/KpiGrid";
import { PerformanceBarChart } from "@/components/charts/PerformanceBarChart";
import { CategoryPieChart } from "@/components/charts/CategoryPieChart";
import { ClassMetricChart } from "@/components/charts/ClassMetricChart";
import { TrendLineChart } from "@/components/charts/TrendLineChart";
import { ClassificationTable } from "@/components/metrics/ClassificationTable";
import { ProgressBar } from "@/components/metrics/ProgressBar";
import { METRICS, CATEGORY_COUNTS } from "@/lib/metrics";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics Dashboard — NeuroFace AI" }, { name: "description", content: "Full analytics dashboard: KPIs, class-wise charts, classification report and dataset stats." }] }),
  component: Analytics,
});

const accPrec = [
  { name: "Accuracy", value: METRICS.accuracy },
  { name: "Precision", value: METRICS.precision },
  { name: "Recall", value: METRICS.recall },
  { name: "F1", value: METRICS.f1 },
];

function Analytics() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Dashboard" title="Analytics Dashboard" description="Live overview of model performance, per-class metrics and dataset composition." />

      <div className="mt-10"><KpiGrid /></div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-2xl p-6">
          <h4 className="mb-4 text-base font-semibold">Performance Comparison</h4>
          <PerformanceBarChart />
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h4 className="mb-4 text-base font-semibold">Category Distribution</h4>
          <CategoryPieChart />
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h4 className="mb-4 text-base font-semibold">Accuracy vs Precision vs Recall vs F1</h4>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={accPrec}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.08)" />
              <XAxis dataKey="name" stroke="oklch(0.72 0.04 270)" />
              <YAxis domain={[80, 100]} stroke="oklch(0.72 0.04 270)" />
              <Tooltip contentStyle={{ background: "oklch(0.20 0.04 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8 }} />
              <Legend />
              <Bar dataKey="value" name="Score (%)" fill="oklch(0.70 0.20 290)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h4 className="mb-4 text-base font-semibold">Prediction Trends</h4>
          <TrendLineChart />
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h4 className="mb-4 text-base font-semibold">Class-wise Precision</h4>
          <ClassMetricChart metric="Precision" color="oklch(0.65 0.22 250)" />
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h4 className="mb-4 text-base font-semibold">Class-wise Recall</h4>
          <ClassMetricChart metric="Recall" color="oklch(0.70 0.20 290)" />
        </div>
        <div className="glass-card rounded-2xl p-6 lg:col-span-2">
          <h4 className="mb-4 text-base font-semibold">Class-wise F1 Score</h4>
          <ClassMetricChart metric="F1" color="oklch(0.72 0.18 320)" />
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-2xl p-6">
          <h4 className="mb-4 text-base font-semibold">Animated Progress Indicators</h4>
          <div className="space-y-4">
            <ProgressBar label="Accuracy" value={METRICS.accuracy} />
            <ProgressBar label="Precision" value={METRICS.precision} />
            <ProgressBar label="Recall" value={METRICS.recall} />
            <ProgressBar label="F1 Score" value={METRICS.f1} />
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h4 className="mb-4 text-base font-semibold">Dataset Statistics</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between border-b border-border/40 pb-2"><span className="text-muted-foreground">Total Images</span><span className="font-semibold">{METRICS.totalSamples.toLocaleString()}</span></li>
            {CATEGORY_COUNTS.map((c) => (
              <li key={c.name} className="flex justify-between border-b border-border/40 pb-2 last:border-0"><span className="text-muted-foreground">{c.name}</span><span className="font-semibold">{c.value.toLocaleString()}</span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <h4 className="mb-4 text-base font-semibold">Classification Report</h4>
        <ClassificationTable />
      </div>

      <div className="mt-10 glass-card rounded-2xl p-8">
        <h3 className="text-xl font-bold">Model Performance Insights</h3>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>• Genuine and Masked classes achieve the highest F1 Score (95%).</li>
          <li>• Fake and Deepfake classes achieve a strong F1 Score (92%).</li>
          <li>• Overall model accuracy is 94% across 4,500 evaluated samples.</li>
        </ul>
      </div>
    </div>
  );
}