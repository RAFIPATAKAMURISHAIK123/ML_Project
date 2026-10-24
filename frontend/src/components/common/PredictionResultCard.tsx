import { motion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CheckCircle2, Clock, Gauge } from "lucide-react";
import type { PredictionResult } from "@/services/api";
import { CATEGORY_COLORS, type ClassName } from "@/lib/metrics";

export function PredictionResultCard({ result }: { result: PredictionResult }) {
  const data = (Object.entries(result.probabilities) as [ClassName, number][]).map(([k, v]) => ({
    name: k,
    probability: Math.round(v * 100),
  }));
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
            <CheckCircle2 className="h-3.5 w-3.5" /> Prediction complete
          </div>
          <h3 className="mt-3 text-2xl font-bold">
            Predicted: <span className="text-gradient">{result.category}</span>
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><Gauge className="h-3.5 w-3.5" /> Confidence</div>
              <div className="mt-1 text-2xl font-bold">{result.confidence}%</div>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" /> Inference</div>
              <div className="mt-1 text-2xl font-bold">{result.processingTime}ms</div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {data.map((d) => (
              <div key={d.name}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{d.name}</span>
                  <span className="font-semibold">{d.probability}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full" style={{ width: `${d.probability}%`, background: CATEGORY_COLORS[d.name as ClassName] }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-semibold">Probability distribution</h4>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.08)" />
              <XAxis dataKey="name" stroke="oklch(0.72 0.04 270)" />
              <YAxis stroke="oklch(0.72 0.04 270)" />
              <Tooltip contentStyle={{ background: "oklch(0.20 0.04 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8 }} />
              <Bar dataKey="probability" radius={[6, 6, 0, 0]} fill="oklch(0.70 0.20 290)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}