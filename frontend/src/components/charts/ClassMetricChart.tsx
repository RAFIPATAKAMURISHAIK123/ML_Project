import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PERFORMANCE_BARS } from "@/lib/metrics";

export function ClassMetricChart({ metric, color }: { metric: "Precision" | "Recall" | "F1"; color: string }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={PERFORMANCE_BARS}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.08)" />
        <XAxis dataKey="name" stroke="oklch(0.72 0.04 270)" />
        <YAxis domain={[80, 100]} stroke="oklch(0.72 0.04 270)" />
        <Tooltip contentStyle={{ background: "oklch(0.20 0.04 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8 }} />
        <Bar dataKey={metric} fill={color} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}