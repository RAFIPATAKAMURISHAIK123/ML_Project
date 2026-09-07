import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PREDICTION_TRENDS } from "@/lib/metrics";

export function TrendLineChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={PREDICTION_TRENDS}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.08)" />
        <XAxis dataKey="day" stroke="oklch(0.72 0.04 270)" />
        <YAxis stroke="oklch(0.72 0.04 270)" />
        <Tooltip contentStyle={{ background: "oklch(0.20 0.04 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8 }} />
        <Line type="monotone" dataKey="predictions" stroke="oklch(0.70 0.20 290)" strokeWidth={3} dot={{ r: 4 }} />
        <Line type="monotone" dataKey="accuracy" stroke="oklch(0.72 0.18 200)" strokeWidth={3} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}