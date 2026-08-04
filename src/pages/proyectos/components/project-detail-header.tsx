import { Code2, Upload } from 'lucide-react'
import { Button } from '@/shared/ui'
import type { Proyecto } from '@/data/proyectos'
import { DeleteProjectDialog } from './delete-project-dialog'
import { ShareProjectDialog } from './share-project-dialog'

interface ProjectDetailHeaderProps {
  proyecto: Proyecto
  onPublishClick: () => void
  onDelete: () => void
}

export function ProjectDetailHeader({ proyecto, onPublishClick, onDelete }: ProjectDetailHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
          <Code2 className="size-4" />
        </div>
        <h1 className="truncate font-heading text-xl font-semibold">{proyecto.name}</h1>
        <span className="shrink-0 rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">
          {proyecto.type}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button className="flex-1 sm:flex-none" onClick={onPublishClick}>
          <Upload className="size-4" />
          Publicar nueva versión
        </Button>
        <ShareProjectDialog projectName={proyecto.name} url={proyecto.url} />
        <DeleteProjectDialog projectName={proyecto.name} onConfirm={onDelete} />
      </div>
    </div>
  )
}
