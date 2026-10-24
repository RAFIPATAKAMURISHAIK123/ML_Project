import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PERFORMANCE_BARS } from "@/lib/metrics";

export function PerformanceBarChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={PERFORMANCE_BARS}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.08)" />
        <XAxis dataKey="name" stroke="oklch(0.72 0.04 270)" />
        <YAxis domain={[80, 100]} stroke="oklch(0.72 0.04 270)" />
        <Tooltip contentStyle={{ background: "oklch(0.20 0.04 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8 }} />
        <Legend />
        <Bar dataKey="Precision" fill="oklch(0.65 0.22 250)" radius={[6, 6, 0, 0]} />
        <Bar dataKey="Recall" fill="oklch(0.70 0.20 290)" radius={[6, 6, 0, 0]} />
        <Bar dataKey="F1" fill="oklch(0.72 0.18 320)" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}