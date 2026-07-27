import { Link } from 'react-router'
import { Code2, Layers } from 'lucide-react'
import { cn, formatDateTime } from '@/shared/lib/utils'
import type { Proyecto, ProjectType } from '@/data/proyectos'

const TYPE_ICON: Record<ProjectType, typeof Code2> = {
  HTML: Code2,
  'Next.js': Layers,
}

const TYPE_COLOR: Record<ProjectType, string> = {
  HTML: 'bg-amber-500/10 text-amber-500',
  'Next.js': 'bg-devexp-violet/10 text-devexp-violet',
}

interface ProjectCardProps {
  proyecto: Proyecto
  showOwner?: boolean
}

export function ProjectCard({ proyecto, showOwner = false }: ProjectCardProps) {
  const isOnline = proyecto.status === 'online'
  const TypeIcon = TYPE_ICON[proyecto.type]

  return (
    <Link
      to={`/proyectos/${proyecto.id}`}
      className="block w-full rounded-xl border border-border p-4 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-card-hover"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <div className={cn('flex size-8 shrink-0 items-center justify-center rounded-lg', TYPE_COLOR[proyecto.type])}>
            <TypeIcon className="size-4" />
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

      <div className="mb-3 rounded-lg border border-border px-2 py-1.5">
        <span className="block truncate font-mono text-xs text-muted-foreground">{proyecto.url}</span>
      </div>

      <p className="text-xs text-muted-foreground">Última publicación: {formatDateTime(proyecto.lastPublishedAt)}</p>
      {showOwner && <p className="mt-1 text-xs text-muted-foreground">Por {proyecto.owner}</p>}
    </Link>
  )
}
