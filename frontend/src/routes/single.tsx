import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { UploadCloud, Zap, RotateCcw } from "lucide-react";
import { predictSingle, type PredictionResult } from "@/services/api";
import { Loader } from "@/components/common/Loader";
import { PredictionResultCard } from "@/components/common/PredictionResultCard";
import { SectionHeader } from "@/components/common/SectionHeader";

export const Route = createFileRoute("/single")({
  head: () => ({ meta: [{ title: "Single Image Prediction — NeuroFace AI" }, { name: "description", content: "Upload one image to classify as Genuine, Fake, Masked, or Deepfake." }] }),
  component: Single,
});

function Single() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [dragging, setDragging] = useState(false);

  const onFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) { toast.error("Please upload an image file"); return; }
    setFile(f); setUrl(URL.createObjectURL(f)); setResult(null);
  }, []);

  async function predict() {
    if (!file) return;
    setLoading(true); setResult(null);
    try {
      const r = await predictSingle(file);
      setResult(r);
      toast.success(`Predicted: ${r.category} (${r.confidence}%)`);
    } catch { toast.error("Prediction failed"); }
    finally { setLoading(false); }
  }
  function reset() { setFile(null); setUrl(null); setResult(null); }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Single Image" title="Single Image Prediction" description="Drag & drop or browse an image to get instant classification." />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-2xl p-6">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files?.[0]; if (f) onFile(f); }}
            className={`relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-colors ${dragging ? "border-primary bg-primary/10" : "border-border bg-muted/30"}`}
          >
            {url ? (
              <img src={url} alt="Preview" className="h-full w-full object-contain" />
            ) : (
              <div className="text-center">
                <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Drag & drop an image here, or</p>
                <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-md bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow">
                  Browse
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
                </label>
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={predict} disabled={!file || loading} className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow disabled:opacity-60"><Zap className="h-4 w-4" /> Predict</button>
            <button onClick={reset} className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm"><RotateCcw className="h-4 w-4" /> Reset</button>
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6">
          {loading && <Loader />}
          {!loading && !result && <p className="text-sm text-muted-foreground">Upload an image and click Predict to see results.</p>}
          {!loading && result && <PredictionResultCard result={result} />}
        </div>
      </div>
    </div>
  );
}