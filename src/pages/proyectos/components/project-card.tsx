import { Link } from 'react-router'
import { Code2, Copy, ExternalLink } from 'lucide-react'
import { cn, formatDateTime } from '@/shared/lib/utils'
import type { Proyecto } from '@/data/proyectos'

export function ProjectCard({ proyecto }: { proyecto: Proyecto }) {
  const isOnline = proyecto.status === 'online'

  return (
    <Link
      to={`/proyectos/${proyecto.id}`}
      className="block w-72 rounded-xl border border-border p-4 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_8px_24px_rgb(29_158_117_/_15%)]"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
            <Code2 className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{proyecto.name}</p>
            <p className="text-xs text-muted-foreground">{proyecto.type}</p>
          </div>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 rounded-md border border-border px-2 py-1 text-xs">
          <span className={cn('size-1.5 rounded-full', isOnline ? 'bg-success' : 'bg-muted-foreground')} />
          {isOnline ? 'En línea' : 'Detenido'}
        </span>
      </div>

      <div className="mb-3 flex items-center justify-between gap-2 rounded-lg border border-border px-2 py-1.5">
        <span className="truncate font-mono text-xs text-muted-foreground">{proyecto.url}</span>
        <span className="flex shrink-0 gap-1 text-muted-foreground">
          <Copy className="size-3.5" />
          <ExternalLink className="size-3.5" />
        </span>
      </div>

      <p className="text-xs text-muted-foreground">Última publicación: {formatDateTime(proyecto.lastPublishedAt)}</p>
    </Link>
  )
}
