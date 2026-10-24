export function Loader({ label = "Analyzing…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
        <div className="absolute inset-2 rounded-full bg-gradient-primary shadow-glow" />
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}