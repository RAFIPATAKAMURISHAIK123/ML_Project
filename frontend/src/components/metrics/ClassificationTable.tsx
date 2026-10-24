import { CLASS_REPORT } from "@/lib/metrics";

export function ClassificationTable() {
  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/40 text-left">
              <th className="px-4 py-3 font-semibold">Class</th>
              <th className="px-4 py-3 font-semibold">Precision</th>
              <th className="px-4 py-3 font-semibold">Recall</th>
              <th className="px-4 py-3 font-semibold">F1-Score</th>
              <th className="px-4 py-3 font-semibold">Support</th>
            </tr>
          </thead>
          <tbody>
            {CLASS_REPORT.map((row) => (
              <tr key={row.class} className="border-b border-border/40 last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">{row.class}</td>
                <td className="px-4 py-3">{row.precision.toFixed(2)}</td>
                <td className="px-4 py-3">{row.recall.toFixed(2)}</td>
                <td className="px-4 py-3">{row.f1.toFixed(2)}</td>
                <td className="px-4 py-3">{row.support.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}