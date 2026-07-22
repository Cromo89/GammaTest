import { Link } from 'react-router'
import { Folder, Plus } from 'lucide-react'
import { Button } from '@/shared/ui'
import { proyectos } from '@/data/proyectos'
import { ProjectCard } from './components/project-card'

export function ProyectosPage() {
  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Proyectos</h1>
          <p className="mt-1 text-sm text-muted-foreground">Despliega apps HTML y Next.js</p>
        </div>
        <Button asChild>
          <Link to="/proyectos/nuevo">
            <Plus className="size-4" />
            Nuevo proyecto
          </Link>
        </Button>
      </div>

      {proyectos.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
            <Folder className="size-7 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">Sin proyectos aún</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Crea tu primer proyecto para desplegar una aplicación HTML o Next.js
            </p>
          </div>
          <Button asChild>
            <Link to="/proyectos/nuevo">
              <Plus className="size-4" />
              Crear proyecto
            </Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {proyectos.map((proyecto) => (
            <ProjectCard key={proyecto.id} proyecto={proyecto} />
          ))}
        </div>
      )}
    </div>
  )
}
