import { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router'
import { Plus } from 'lucide-react'
import { Button } from '@/shared/ui'
import { getFirstName } from '@/shared/lib/utils'
import { useProyectos } from '@/features/proyectos/use-proyectos'
import { ProjectStats } from '../proyectos/components/project-stats'
import { ExpiringProjects } from '../proyectos/components/expiring-projects'
import { ProjectsSection } from './components/projects-section'
import { InicioSkeleton } from './components/inicio-skeleton'

const LOADING_DELAY_MS = 700

interface ShellContext {
  searchQuery: string
  email: string
}

export function InicioPage() {
  const { searchQuery, email } = useOutletContext<ShellContext>()
  const { proyectos } = useProyectos()
  const [isLoading, setIsLoading] = useState(true)
  const query = searchQuery.trim().toLowerCase()
  const visibleProyectos = query
    ? proyectos.filter(
        (proyecto) => proyecto.name.toLowerCase().includes(query) || proyecto.url.toLowerCase().includes(query),
      )
    : proyectos

  useEffect(() => {
    const id = window.setTimeout(() => setIsLoading(false), LOADING_DELAY_MS)
    return () => window.clearTimeout(id)
  }, [])

  if (isLoading) return <InicioSkeleton />

  return (
    <div>
      <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-mono font-medium tracking-[0.2em] text-primary uppercase">Bienvenido al portal</p>
          <h1 className="mt-2 font-heading text-2xl font-semibold">Hola, {getFirstName(email)}</h1>
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
