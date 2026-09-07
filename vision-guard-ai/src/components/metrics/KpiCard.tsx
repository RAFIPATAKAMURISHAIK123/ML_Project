import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export function KpiCard({
  label,
  value,
  suffix,
  icon: Icon,
  delay = 0,
}: {
  label: string;
  value: string | number;
  suffix?: string;
  icon: LucideIcon;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass-card relative overflow-hidden rounded-2xl p-5"
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-primary opacity-20 blur-2xl" />
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 text-3xl font-bold tracking-tight">
        <span className="text-gradient">{value}</span>
        {suffix && <span className="ml-1 text-base text-muted-foreground">{suffix}</span>}
      </div>
    </motion.div>
  );
}