import { Link } from 'react-router'
import { Clock } from 'lucide-react'
import type { Proyecto } from '@/data/proyectos'

const EXPIRING_THRESHOLD_HOURS = 48

interface ExpiringProjectsProps {
  proyectos: Proyecto[]
  showOwner?: boolean
}

export function ExpiringProjects({ proyectos, showOwner = false }: ExpiringProjectsProps) {
  const expiring = proyectos
    .filter((proyecto) => proyecto.status === 'online' && proyecto.hoursRemaining > 0 && proyecto.hoursRemaining <= EXPIRING_THRESHOLD_HOURS)
    .sort((a, b) => a.hoursRemaining - b.hoursRemaining)

  if (expiring.length === 0) return null

  return (
    <div className="mb-8 rounded-xl border border-warning/30 bg-warning/5 p-4">
      <div className="flex items-center gap-2">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-warning text-background">
          <Clock className="size-4" />
        </span>
        <div>
          <p className="text-sm font-medium">Por expirar pronto</p>
          <p className="text-xs text-muted-foreground">
            Estos proyectos dejarán de estar en línea si no se publica una nueva versión.
          </p>
        </div>
      </div>
      <ul className="mt-3 flex flex-col gap-2">
        {expiring.map((proyecto) => (
          <li key={proyecto.id}>
            <Link
              to={`/proyectos/${proyecto.id}`}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background/40 px-3 py-2 text-sm transition-colors hover:border-warning/50"
            >
              <span className="min-w-0 truncate">
                {proyecto.name}
                {showOwner && <span className="ml-2 text-xs text-muted-foreground">· {proyecto.owner}</span>}
              </span>
              <span className="shrink-0 text-xs font-medium text-warning">{proyecto.hoursRemaining}h restantes</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
