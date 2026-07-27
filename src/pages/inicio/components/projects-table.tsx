import { useNavigate } from 'react-router'
import { Atom, Code2, Layers } from 'lucide-react'
import { cn, formatDateTime } from '@/shared/lib/utils'
import type { Proyecto, ProjectType } from '@/data/proyectos'

const TYPE_ICON: Record<ProjectType, typeof Code2> = {
  HTML: Code2,
  'React/Vite': Atom,
  'Next.js': Layers,
}

const TYPE_COLOR: Record<ProjectType, string> = {
  HTML: 'bg-amber-500/10 text-amber-500',
  'React/Vite': 'bg-sky-500/10 text-sky-500',
  'Next.js': 'bg-devexp-violet/10 text-devexp-violet',
}

export function ProjectsTable({ proyectos }: { proyectos: Proyecto[] }) {
  const navigate = useNavigate()

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs text-muted-foreground">
            <th className="px-4 py-2 font-medium">Proyecto</th>
            <th className="px-4 py-2 font-medium">Estado</th>
            <th className="px-4 py-2 font-medium">URL</th>
            <th className="px-4 py-2 font-medium">Dueño</th>
            <th className="px-4 py-2 font-medium">Última publicación</th>
          </tr>
        </thead>
        <tbody>
          {proyectos.map((proyecto) => {
            const TypeIcon = TYPE_ICON[proyecto.type]
            const isOnline = proyecto.status === 'online'
            return (
              <tr
                key={proyecto.id}
                onClick={() => navigate(`/proyectos/${proyecto.id}`)}
                className="cursor-pointer border-b border-border last:border-0 hover:bg-muted/40"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'flex size-7 shrink-0 items-center justify-center rounded-md',
                        TYPE_COLOR[proyecto.type],
                      )}
                    >
                      <TypeIcon className="size-3.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{proyecto.name}</p>
                      <p className="text-xs text-muted-foreground">{proyecto.type}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1.5 text-xs">
                    <span className={cn('size-1.5 rounded-full', isOnline ? 'bg-success' : 'bg-muted-foreground')} />
                    {isOnline ? 'En línea' : 'Detenido'}
                  </span>
                </td>
                <td className="max-w-[200px] truncate px-4 py-3 font-mono text-xs text-muted-foreground">
                  {proyecto.url}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{proyecto.owner}</td>
                <td className="px-4 py-3 text-xs whitespace-nowrap text-muted-foreground">
                  {formatDateTime(proyecto.lastPublishedAt)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
