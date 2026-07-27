import { Check } from 'lucide-react'
import type { ProjectType } from '@/data/proyectos'

interface WizardStepDetectProps {
  fileName: string
  type: ProjectType
}

export function WizardStepDetect({ fileName, type }: WizardStepDetectProps) {
  return (
    <div className="rounded-xl border border-border p-6">
      <div className="flex items-center gap-3 rounded-lg bg-muted px-4 py-3">
        <Check className="size-4 text-primary" />
        <div>
          <p className="text-sm font-medium">Proyecto detectado: {type}</p>
          <p className="text-xs text-muted-foreground">{fileName} — listo para configurar</p>
        </div>
      </div>
    </div>
  )
}
