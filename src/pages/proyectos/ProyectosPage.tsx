import { useEffect, useState } from 'react'
import { Link, useLocation, useOutletContext } from 'react-router'
import { Folder, Plus } from 'lucide-react'
import { Button } from '@/shared/ui'
import { getFirstName, getFullName } from '@/shared/lib/utils'
import { useProyectos } from '@/features/proyectos/use-proyectos'
import { ProjectCard } from './components/project-card'
import { NewProjectCard } from './components/new-project-card'
import { ExpiringProjects } from './components/expiring-projects'
import { PublishToast } from './components/publish-toast'

interface ShellContext {
  searchQuery: string
  email: string
}

interface LocationState {
  toast?: string
}

export function ProyectosPage() {
  const { searchQuery, email } = useOutletContext<ShellContext>()
  const location = useLocation()
  const { proyectos } = useProyectos()
  const [toast, setToast] = useState(() => (location.state as LocationState | null)?.toast ?? null)
  const myProyectos = proyectos.filter((proyecto) => proyecto.owner === getFullName(email))
  const query = searchQuery.trim().toLowerCase()
  const visibleProyectos = query
    ? myProyectos.filter(
        (proyecto) => proyecto.name.toLowerCase().includes(query) || proyecto.url.toLowerCase().includes(query),
      )
    : myProyectos

  useEffect(() => {
    if (!toast) return
    const timeout = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(timeout)
  }, [toast])

  return (
    <div>
      <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Hola, {getFirstName(email)}. ¿Qué quieres publicar hoy?</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Los proyectos que tú has publicado. Para ver los de todo el equipo, visita Inicio.
          </p>
        </div>
        {myProyectos.length > 0 && (
          <Button asChild className="w-full sm:w-auto">
            <Link to="/proyectos/nuevo">
              <Plus className="size-4" />
              Nuevo proyecto
            </Link>
          </Button>
        )}
      </div>

      <ExpiringProjects proyectos={myProyectos} />

      {visibleProyectos.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
              <Folder className="size-7 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">{query ? 'Sin resultados' : 'Sin proyectos aún'}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {query
                  ? `Ningún proyecto coincide con "${searchQuery}"`
                  : 'Crea tu primer proyecto para desplegar una aplicación HTML, React/Vite o Next.js'}
              </p>
            </div>
          </div>
          {!query && (
            <div className="w-full max-w-sm">
              <NewProjectCard />
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProyectos.map((proyecto) => (
            <ProjectCard key={proyecto.id} proyecto={proyecto} />
          ))}
          {!query && <NewProjectCard />}
        </div>
      )}

      {toast && <PublishToast message={toast} />}
    </div>
  )
}
