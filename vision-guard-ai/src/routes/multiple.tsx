import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import { Download, FileDown, FolderUp, Trash2, Zap, Search } from "lucide-react";
import { predictMultiple, type BatchPrediction } from "@/services/api";
import { Loader } from "@/components/common/Loader";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CATEGORY_COLORS, type ClassName } from "@/lib/metrics";

export const Route = createFileRoute("/multiple")({
  head: () => ({ meta: [{ title: "Multiple Image Prediction — NeuroFace AI" }, { name: "description", content: "Batch predict folders of images and export results." }] }),
  component: Multiple,
});

const PAGE_SIZE = 8;

function Multiple() {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<BatchPrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | ClassName>("all");
  const [sort, setSort] = useState<"name" | "confidence">("confidence");
  const [page, setPage] = useState(1);

  function onPick(list: FileList | null) {
    if (!list) return;
    const arr = Array.from(list).filter((f) => f.type.startsWith("image/"));
    setFiles(arr); setResults([]); setPage(1);
    toast.success(`${arr.length} images loaded`);
  }

  async function predictAll() {
    if (!files.length) return;
    setLoading(true);
    try {
      const r = await predictMultiple(files);
      setResults(r); toast.success(`Predicted ${r.length} images`);
    } catch { toast.error("Batch prediction failed"); }
    finally { setLoading(false); }
  }
  function clear() { setFiles([]); setResults([]); }

  const filtered = useMemo(() => {
    let r = results;
    if (filter !== "all") r = r.filter((x) => x.category === filter);
    if (search) r = r.filter((x) => x.name.toLowerCase().includes(search.toLowerCase()));
    r = [...r].sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : b.confidence - a.confidence);
    return r;
  }, [results, filter, search, sort]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const counts = useMemo(() => {
    const c: Record<ClassName, number> = { Genuine: 0, Fake: 0, Masked: 0, Deepfake: 0 };
    results.forEach((r) => { c[r.category]++; });
    return c;
  }, [results]);
  const avgConfidence = results.length ? +(results.reduce((a, b) => a + b.confidence, 0) / results.length).toFixed(1) : 0;
  const avgTime = results.length ? Math.round(results.reduce((a, b) => a + b.processingTime, 0) / results.length) : 0;

  const pieData = (Object.entries(counts) as [ClassName, number][]).map(([name, value]) => ({ name, value }));
  const histData = useMemo(() => {
    const bins = [50, 60, 70, 80, 90, 100];
    return bins.slice(0, -1).map((b, i) => ({
      range: `${b}-${bins[i + 1]}`,
      count: results.filter((r) => r.confidence >= b && r.confidence < bins[i + 1]).length,
    }));
  }, [results]);

  function downloadCsv() {
    const rows = ["Image Name,Prediction,Confidence (%),Processing Time (ms)", ...results.map((r) => `${r.name},${r.category},${r.confidence},${r.processingTime}`)];
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "predictions.csv"; a.click();
  }
  function downloadPdf() {
    const html = `<html><head><title>Predictions</title><style>body{font-family:sans-serif;padding:24px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ccc;padding:8px;text-align:left}</style></head><body><h1>NeuroFace AI — Batch Predictions</h1><table><thead><tr><th>Image</th><th>Prediction</th><th>Confidence</th><th>Time (ms)</th></tr></thead><tbody>${results.map(r => `<tr><td>${r.name}</td><td>${r.category}</td><td>${r.confidence}%</td><td>${r.processingTime}</td></tr>`).join("")}</tbody></table></body></html>`;
    const w = window.open("", "_blank"); if (w) { w.document.write(html); w.document.close(); w.print(); }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Batch Mode" title="Multiple Image Prediction" description="Upload a folder of images, classify them all and export the results." />

      <div className="mt-10 glass-card rounded-2xl p-6">
        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow">
            <FolderUp className="h-4 w-4" /> Upload Folder / Images
            {/* @ts-expect-error webkitdirectory */}
            <input type="file" multiple webkitdirectory="" directory="" className="hidden" accept="image/*" onChange={(e) => onPick(e.target.files)} />
          </label>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border px-4 py-2 text-sm">
            Or pick files
            <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => onPick(e.target.files)} />
          </label>
          <button onClick={predictAll} disabled={!files.length || loading} className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow disabled:opacity-60"><Zap className="h-4 w-4" /> Predict All</button>
          <button onClick={clear} className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm"><Trash2 className="h-4 w-4" /> Clear</button>
          <span className="ml-auto text-sm text-muted-foreground">{files.length} images selected</span>
        </div>
        {files.length > 0 && (
          <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-8">
            {files.slice(0, 16).map((f, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-lg border border-border bg-muted/30">
                <img src={URL.createObjectURL(f)} alt={f.name} className="h-full w-full object-cover" />
              </div>
            ))}
            {files.length > 16 && <div className="flex aspect-square items-center justify-center rounded-lg border border-border bg-muted/30 text-sm text-muted-foreground">+{files.length - 16}</div>}
          </div>
        )}
      </div>

      {loading && <div className="mt-8 glass-card rounded-2xl p-8"><Loader label="Processing batch…" /></div>}

      {results.length > 0 && (
        <>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { l: "Total Processed", v: results.length },
              { l: "Avg. Confidence", v: `${avgConfidence}%` },
              { l: "Avg. Time", v: `${avgTime}ms` },
              { l: "Categories", v: 4 },
            ].map((k) => (
              <div key={k.l} className="glass-card rounded-2xl p-5">
                <div className="text-sm text-muted-foreground">{k.l}</div>
                <div className="mt-1 text-2xl font-bold text-gradient">{k.v}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(counts) as ClassName[]).map((c) => (
              <div key={c} className="glass-card rounded-2xl p-5">
                <div className="text-sm text-muted-foreground">{c}</div>
                <div className="mt-1 text-2xl font-bold" style={{ color: CATEGORY_COLORS[c] }}>{counts[c]}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="glass-card rounded-2xl p-6">
              <h4 className="mb-4 text-base font-semibold">Category Distribution</h4>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} innerRadius={50}>
                    {pieData.map((d) => <Cell key={d.name} fill={CATEGORY_COLORS[d.name as ClassName]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "oklch(0.20 0.04 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8 }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h4 className="mb-4 text-base font-semibold">Confidence Distribution</h4>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={histData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.08)" />
                  <XAxis dataKey="range" stroke="oklch(0.72 0.04 270)" />
                  <YAxis stroke="oklch(0.72 0.04 270)" />
                  <Tooltip contentStyle={{ background: "oklch(0.20 0.04 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8 }} />
                  <Bar dataKey="count" fill="oklch(0.70 0.20 290)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6 glass-card rounded-2xl p-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search by name" className="rounded-md border border-border bg-muted/30 py-2 pl-8 pr-3 text-sm" />
              </div>
              <select value={filter} onChange={(e) => { setFilter(e.target.value as any); setPage(1); }} className="rounded-md border border-border bg-muted/30 px-3 py-2 text-sm">
                <option value="all">All categories</option>
                {(["Genuine","Fake","Masked","Deepfake"] as ClassName[]).map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="rounded-md border border-border bg-muted/30 px-3 py-2 text-sm">
                <option value="confidence">Sort: Confidence</option>
                <option value="name">Sort: Name</option>
              </select>
              <div className="ml-auto flex gap-2">
                <button onClick={downloadCsv} className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted"><Download className="h-4 w-4" /> CSV</button>
                <button onClick={downloadPdf} className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted"><FileDown className="h-4 w-4" /> PDF</button>
              </div>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 bg-muted/40 text-left">
                    <th className="px-4 py-3">Image</th><th className="px-4 py-3">Prediction</th><th className="px-4 py-3">Confidence</th><th className="px-4 py-3">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((r) => (
                    <tr key={r.name} className="border-b border-border/40 last:border-0">
                      <td className="px-4 py-3">{r.name}</td>
                      <td className="px-4 py-3"><span className="rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: `${CATEGORY_COLORS[r.category]}22`, color: CATEGORY_COLORS[r.category] }}>{r.category}</span></td>
                      <td className="px-4 py-3">{r.confidence}%</td>
                      <td className="px-4 py-3">{r.processingTime}ms</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>Page {page} of {totalPages}</span>
              <div className="flex gap-2">
                <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="rounded-md border border-border px-3 py-1 disabled:opacity-50">Prev</button>
                <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="rounded-md border border-border px-3 py-1 disabled:opacity-50">Next</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}