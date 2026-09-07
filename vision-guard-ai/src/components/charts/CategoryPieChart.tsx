import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CATEGORY_COUNTS, CATEGORY_COLORS, type ClassName } from "@/lib/metrics";

export function CategoryPieChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={CATEGORY_COUNTS} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={3}>
          {CATEGORY_COUNTS.map((d) => (
            <Cell key={d.name} fill={CATEGORY_COLORS[d.name as ClassName]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ background: "oklch(0.20 0.04 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8 }} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}