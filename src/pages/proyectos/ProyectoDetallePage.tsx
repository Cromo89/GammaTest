import { useRef, type ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { Dropzone } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import { useProyectos } from '@/features/proyectos/use-proyectos'
import { useDeployActions } from './use-deploy-actions'
import { DeployHistoryTable } from './components/deploy-history-table'
import { ProjectDetailHeader } from './components/project-detail-header'
import { ProjectUrlBar } from './components/project-url-bar'
import { PublishToast } from './components/publish-toast'

function Pill({ children, dot }: { children: ReactNode; dot?: 'online' | 'offline' }) {
  return (
    <span className="flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground">
      {dot && <span className={cn('size-1.5 rounded-full', dot === 'online' ? 'bg-success' : 'bg-muted-foreground')} />}
      {children}
    </span>
  )
}

export function ProyectoDetallePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { proyectos, deleteProyecto } = useProyectos()
  const proyecto = proyectos.find((p) => p.id === id)
  const historyRef = useRef<HTMLDivElement>(null)
  const { toast, handlePublish, handleRollback, handleToggleStatus, handleExtendTtl } = useDeployActions(proyecto)

  if (!proyecto) return <p className="text-sm text-muted-foreground">Proyecto no encontrado.</p>

  function handleDelete() {
    if (!proyecto) return
    deleteProyecto(proyecto.id)
    navigate('/proyectos', { state: { toast: `"${proyecto.name}" fue eliminado.` } })
  }

  function handlePublishClick() {
    handlePublish()
    historyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Volver
      </button>

      <ProjectDetailHeader proyecto={proyecto} onPublishClick={handlePublishClick} onDelete={handleDelete} />

      <ProjectUrlBar url={proyecto.url} />

      <div className="flex flex-wrap gap-2">
        <Pill dot={proyecto.status}>{proyecto.status === 'online' ? 'En línea' : 'Detenido'}</Pill>
        <Pill>
          {proyecto.deploys.length} deploy{proyecto.deploys.length === 1 ? '' : 's'}
        </Pill>
        <Pill>{proyecto.hoursRemaining}h restantes</Pill>
      </div>

      <Dropzone title="Arrastra un .zip, .html o carpeta para deployar" />

      <div ref={historyRef}>
        <DeployHistoryTable
          deploys={proyecto.deploys}
          onRollback={handleRollback}
          onToggleStatus={handleToggleStatus}
          onExtendTtl={handleExtendTtl}
        />
      </div>

      {toast && <PublishToast message={toast} />}
    </div>
  )
}
