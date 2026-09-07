export function SectionHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <span className="inline-flex rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-muted-foreground">{description}</p>}
    </div>
  );
}