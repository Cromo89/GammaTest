import { FileCode2, Globe } from 'lucide-react'
import { slugify } from '@/shared/lib/utils'

interface WizardStepDeployProps {
  name: string
  fileName: string
}

export function WizardStepDeploy({ name, fileName }: WizardStepDeployProps) {
  const slug = slugify(name)

  return (
    <div className="rounded-xl border border-border p-6">
      <p className="text-sm font-medium">Todo listo para desplegar</p>
      <p className="mt-1 text-xs text-muted-foreground">Revisa los detalles antes de publicar tu proyecto.</p>

      <div className="mt-4 flex flex-col gap-3">
        <div className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
          <FileCode2 className="size-4 shrink-0 text-muted-foreground" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{name || 'Sin nombre'}</p>
            <p className="text-xs text-muted-foreground">{fileName} · HTML</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
          <Globe className="size-4 shrink-0 text-muted-foreground" />
          <p className="truncate font-mono text-xs text-muted-foreground">
            <span className="text-foreground">{slug || 'tu-proyecto'}</span>.gamma.pulsar.codes
          </p>
        </div>
      </div>
    </div>
  )
}
