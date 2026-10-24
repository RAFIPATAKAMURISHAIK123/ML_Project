import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Camera, Play, RefreshCw, Square, Zap } from "lucide-react";
import { predictLive, type PredictionResult } from "@/services/api";
import { Loader } from "@/components/common/Loader";
import { PredictionResultCard } from "@/components/common/PredictionResultCard";
import { SectionHeader } from "@/components/common/SectionHeader";

export const Route = createFileRoute("/live")({
  head: () => ({ meta: [{ title: "Live Prediction — NeuroFace AI" }, { name: "description", content: "Real-time webcam face classification." }] }),
  component: Live,
});

function Live() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [capturedUrl, setCapturedUrl] = useState<string | null>(null);
  const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  useEffect(() => () => { streamRef.current?.getTracks().forEach((t) => t.stop()); }, []);

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play(); }
      setStreaming(true);
      toast.success("Camera started");
    } catch (e) {
      toast.error("Unable to access camera");
    }
  }
  function stopCamera() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setStreaming(false);
  }
  function capture() {
    const video = videoRef.current; const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth; canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) return;
      setCapturedBlob(blob);
      setCapturedUrl(URL.createObjectURL(blob));
      setResult(null);
    }, "image/jpeg", 0.9);
  }
  async function predict() {
    if (!capturedBlob) return;
    setLoading(true); setResult(null);
    try {
      const r = await predictLive(capturedBlob);
      setResult(r);
      toast.success(`Predicted: ${r.category} (${r.confidence}%)`);
    } catch { toast.error("Prediction failed"); }
    finally { setLoading(false); }
  }
  function retake() { setCapturedBlob(null); setCapturedUrl(null); setResult(null); }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Live Mode" title="Live Camera Prediction" description="Capture from your webcam and classify in real time." />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="glass-card overflow-hidden rounded-2xl p-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
            {capturedUrl ? (
              <img src={capturedUrl} alt="Captured" className="h-full w-full object-cover" />
            ) : (
              <video ref={videoRef} className="h-full w-full object-cover" muted playsInline />
            )}
            {!streaming && !capturedUrl && (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <Camera className="h-10 w-10" />
              </div>
            )}
          </div>
          <canvas ref={canvasRef} className="hidden" />
          <div className="mt-4 flex flex-wrap gap-2">
            {!streaming && !capturedUrl && (
              <button onClick={startCamera} className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow"><Play className="h-4 w-4" /> Start Camera</button>
            )}
            {streaming && !capturedUrl && (
              <>
                <button onClick={capture} className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow"><Camera className="h-4 w-4" /> Capture</button>
                <button onClick={stopCamera} className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm"><Square className="h-4 w-4" /> Stop</button>
              </>
            )}
            {capturedUrl && (
              <>
                <button onClick={predict} disabled={loading} className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow disabled:opacity-60"><Zap className="h-4 w-4" /> Predict</button>
                <button onClick={retake} className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm"><RefreshCw className="h-4 w-4" /> Retake</button>
              </>
            )}
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6">
          {loading && <Loader label="Running inference…" />}
          {!loading && !result && <p className="text-sm text-muted-foreground">Capture a frame and click <span className="text-foreground font-medium">Predict</span> to see classification results.</p>}
          {!loading && result && <PredictionResultCard result={result} />}
        </div>
      </div>
    </div>
  );
}
