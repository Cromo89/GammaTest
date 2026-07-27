import { useRef, useState, type ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Check, Code2, Copy, ExternalLink, Globe, Upload } from 'lucide-react'
import { Button, Dropzone } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import { proyectos } from '@/data/proyectos'
import { DeployHistoryTable } from './components/deploy-history-table'
import { DeleteProjectDialog } from './components/delete-project-dialog'

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
  const proyecto = proyectos.find((p) => p.id === id)
  const dropzoneRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  if (!proyecto) return <p className="text-sm text-muted-foreground">Proyecto no encontrado.</p>

  function handleCopyUrl() {
    if (!proyecto) return
    navigator.clipboard.writeText(`https://${proyecto.url}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDelete() {
    if (!proyecto) return
    navigate('/proyectos', { state: { toast: `"${proyecto.name}" fue eliminado.` } })
  }

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
            <Code2 className="size-4" />
          </div>
          <h1 className="font-heading text-xl font-semibold">{proyecto.name}</h1>
          <span className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">
            {proyecto.type}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => dropzoneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
            <Upload className="size-4" />
            Publicar nueva versión
          </Button>
          <DeleteProjectDialog projectName={proyecto.name} onConfirm={handleDelete} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2">
        <span className="flex items-center gap-2 truncate font-mono text-sm text-muted-foreground">
          <Globe className="size-4 shrink-0" />
          {proyecto.url}
        </span>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" onClick={handleCopyUrl}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? 'Copiado' : 'Copiar'}
          </Button>
          <Button asChild>
            <a href={`https://${proyecto.url}`} target="_blank" rel="noreferrer">
              <ExternalLink className="size-4" />
              Visitar
            </a>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Pill dot={proyecto.status}>{proyecto.status === 'online' ? 'En línea' : 'Detenido'}</Pill>
        <Pill>
          {proyecto.deploys.length} deploy{proyecto.deploys.length === 1 ? '' : 's'}
        </Pill>
        <Pill>{proyecto.hoursRemaining}h restantes</Pill>
        <Pill>{proyecto.type}</Pill>
      </div>

      <div ref={dropzoneRef}>
        <Dropzone title="Arrastra un .zip, .html o carpeta para deployar" />
      </div>

      <DeployHistoryTable deploys={proyecto.deploys} />
    </div>
  )
}
