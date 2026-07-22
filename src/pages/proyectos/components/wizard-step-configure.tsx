import { Shuffle } from 'lucide-react'
import { slugify } from '@/shared/lib/utils'

interface WizardStepConfigureProps {
  name: string
  onNameChange: (value: string) => void
}

export function WizardStepConfigure({ name, onNameChange }: WizardStepConfigureProps) {
  const slug = slugify(name)

  return (
    <div className="rounded-xl border border-border p-6">
      <div className="mb-4 h-32 rounded-lg bg-gradient-to-br from-primary/40 via-primary/10 to-transparent" />

      <label className="mb-2 block text-sm">Nombre del proyecto</label>
      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Mi proyecto increíble"
          className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
        <button
          type="button"
          className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground"
        >
          <Shuffle className="size-4" />
        </button>
      </div>

      {slug && (
        <div className="mt-4">
          <label className="mb-2 block text-sm">URL</label>
          <p className="rounded-md border border-border px-3 py-2 font-mono text-sm text-muted-foreground">
            <span className="text-foreground">{slug}</span>.gamma.pulsar.codes
          </p>
        </div>
      )}
    </div>
  )
}
