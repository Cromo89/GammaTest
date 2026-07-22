import type { ReactNode } from 'react'
import { useParams } from 'react-router'
import { Code2, Copy, ExternalLink, Globe, Trash2, Upload } from 'lucide-react'
import { Button, Dropzone } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import { proyectos } from '@/data/proyectos'
import { DeployItem } from './components/deploy-item'

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
  const proyecto = proyectos.find((p) => p.id === id)

  if (!proyecto) return <p className="text-sm text-muted-foreground">Proyecto no encontrado.</p>

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
          <Button>
            <Upload className="size-4" />
            Deploy
          </Button>
          <Button variant="ghost" className="text-destructive hover:bg-destructive/10">
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2">
        <span className="flex items-center gap-2 truncate font-mono text-sm text-muted-foreground">
          <Globe className="size-4 shrink-0" />
          {proyecto.url}
        </span>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline">
            <Copy className="size-4" />
            Copiar
          </Button>
          <Button>
            <ExternalLink className="size-4" />
            Visitar
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

      <Dropzone title="Arrastra un .zip, .html o carpeta para deployar" />

      <div>
        <p className="mb-2 text-xs font-mono text-muted-foreground uppercase">Deploys</p>
        <div className="flex flex-col gap-3">
          {proyecto.deploys.map((deploy) => (
            <DeployItem key={deploy.id} deploy={deploy} />
          ))}
        </div>
      </div>
    </div>
  )
}
