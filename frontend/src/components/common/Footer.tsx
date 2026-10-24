import { Github, Linkedin, Mail, FileText, Brain } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">NeuroFace AI</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            AI-powered face recognition & deepfake detection with 94% accuracy across 4,500 samples.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Product</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="/live" className="hover:text-foreground">Live Prediction</a></li>
            <li><a href="/single" className="hover:text-foreground">Single Image</a></li>
            <li><a href="/multiple" className="hover:text-foreground">Batch Predict</a></li>
            <li><a href="/analytics" className="hover:text-foreground">Analytics</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Developer</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>NeuroFace Research Team</li>
            <li>contact@neuroface.ai</li>
            <li>Built with React + Deep Learning</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Connect</h4>
          <div className="mt-3 flex gap-3">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="rounded-md border border-border p-2 hover:bg-muted" aria-label="GitHub"><Github className="h-4 w-4" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="rounded-md border border-border p-2 hover:bg-muted" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
            <a href="mailto:contact@neuroface.ai" className="rounded-md border border-border p-2 hover:bg-muted" aria-label="Email"><Mail className="h-4 w-4" /></a>
            <a href="#" className="rounded-md border border-border p-2 hover:bg-muted" aria-label="Docs"><FileText className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NeuroFace AI. All rights reserved.
      </div>
    </footer>
  );
}