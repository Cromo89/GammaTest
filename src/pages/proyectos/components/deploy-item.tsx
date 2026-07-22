import { RotateCcw, Square } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import type { Deploy } from '@/data/proyectos'

export function DeployItem({ deploy }: { deploy: Deploy }) {
  const isOnline = deploy.status === 'online'

  return (
    <div className="rounded-xl border border-border p-4">
      <div className="mb-1 flex items-center gap-2 text-sm">
        <span className={cn('size-1.5 rounded-full', isOnline ? 'bg-success' : 'bg-muted-foreground')} />
        {isOnline ? 'En línea' : 'Detenido'}
        {deploy.isCurrent && (
          <span className="rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
            Actual
          </span>
        )}
        <span className="font-mono text-xs text-muted-foreground">{deploy.hash}</span>
        <span className="text-xs text-muted-foreground">{deploy.type}</span>
        <span className="ml-auto flex items-center gap-3 text-xs text-muted-foreground">
          <button type="button" className="hover:text-foreground">
            Logs
          </button>
          <button type="button" className="flex items-center gap-1 hover:text-foreground">
            <RotateCcw className="size-3" /> Reconstruir
          </button>
          <button type="button" className="flex items-center gap-1 hover:text-foreground">
            <Square className="size-3" /> Detener
          </button>
        </span>
      </div>

      <div className="mb-2 text-xs text-muted-foreground">
        {deploy.relativeLabel} · {deploy.version}
      </div>

      <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
        <span>TTL</span>
        <span className="flex items-center gap-2">
          Expira {deploy.expiresAtLabel}
          <button type="button" className="hover:text-foreground">
            1d
          </button>
          <button type="button" className="hover:text-foreground">
            3d
          </button>
          <button type="button" className="hover:text-foreground">
            7d
          </button>
          <button type="button" className="hover:text-foreground">
            Reset
          </button>
        </span>
      </div>
      <div className="h-1 w-full rounded-full bg-muted">
        <div className="h-1 rounded-full bg-primary" style={{ width: `${deploy.ttlPercent}%` }} />
      </div>
    </div>
  )
}
