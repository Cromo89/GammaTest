import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: number
  hint?: string
}

export function StatCard({ icon: Icon, label, value, hint }: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-muted/40 to-transparent p-4">
      <div className="absolute -top-6 -right-6 size-20 rounded-full bg-primary/15 blur-2xl" />

      <div className="relative flex items-center gap-2">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
      <p className="relative mt-3 font-heading text-2xl font-semibold">{value}</p>
      {hint && <p className="relative mt-0.5 text-xs text-primary">{hint}</p>}
    </div>
  )
}
