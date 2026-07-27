import { useState } from 'react'
import { Link, useOutletContext } from 'react-router'
import { Lightbulb, Plus } from 'lucide-react'
import { Button } from '@/shared/ui'
import { getFirstName } from '@/shared/lib/utils'
import { proyectos } from '@/data/proyectos'
import { ProjectStats } from '../proyectos/components/project-stats'
import { ExpiringProjects } from '../proyectos/components/expiring-projects'
import { ProjectsSection } from './components/projects-section'

const TIPS = [
  'Usa ⌘K (o Ctrl+K) para buscar cualquier proyecto al instante, sin salir del teclado.',
  'Cada proyecto vive según su tier: Alpha dura 7 días, Beta 30 días y Gamma es indefinido.',
  'Desde el detalle de un proyecto puedes publicar una nueva versión en segundos.',
  '¿Te equivocaste? Puedes hacer rollback a un deploy anterior desde el historial.',
  'El color del ícono te dice el tipo de proyecto: ámbar para HTML, violeta para Next.js.',
]

interface ShellContext {
  searchQuery: string
  email: string
}

export function InicioPage() {
  const { searchQuery, email } = useOutletContext<ShellContext>()
  const [tip] = useState(() => TIPS[Math.floor(Math.random() * TIPS.length)])
  const query = searchQuery.trim().toLowerCase()
  const visibleProyectos = query
    ? proyectos.filter(
        (proyecto) => proyecto.name.toLowerCase().includes(query) || proyecto.url.toLowerCase().includes(query),
      )
    : proyectos

  return (
    <div>
      <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-mono font-medium tracking-[0.2em] text-primary uppercase">Bienvenido al portal</p>
          <h1 className="mt-2 font-heading text-2xl font-semibold">Hola, {getFirstName(email)}</h1>
          <p className="mt-1 max-w-lg text-sm text-muted-foreground">
            Gamma es el punto de encuentro de todo lo que Cencosud publica con IA. Explora lo que está creando tu
            equipo, publica tus propias ideas y compártelas con una URL en minutos.
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link to="/proyectos/nuevo">
            <Plus className="size-4" />
            Nuevo proyecto
          </Link>
        </Button>
      </div>

      <ProjectStats proyectos={proyectos} />

      <ExpiringProjects proyectos={proyectos} showOwner />

      <div className="mb-8 flex items-start gap-3 rounded-xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-4">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Lightbulb className="size-4" />
        </span>
        <div>
          <p className="text-sm font-medium">¿Sabías que...?</p>
          <p className="mt-0.5 text-sm text-muted-foreground">{tip}</p>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="font-heading text-lg font-semibold">Lo que está publicando tu equipo</h2>
        <p className="text-sm text-muted-foreground">
          Visibilidad completa de los proyectos activos publicados en el portal.
        </p>
      </div>

      <ProjectsSection proyectos={visibleProyectos} emptyMessage={`Ningún proyecto coincide con "${searchQuery}"`} />
    </div>
  )
}
