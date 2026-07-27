import { Check } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

const STEPS = ['Subir', 'Detectar', 'Configurar', 'Deploy']

export function WizardStepper({ current }: { current: number }) {
  return (
    <div className="scrollbar-hide -mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
      <div className="flex w-max items-center gap-3">
        {STEPS.map((label, index) => {
          const step = index + 1
          const isDone = step < current
          const isActive = step === current

          return (
            <div key={label} className="flex shrink-0 items-center gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-medium',
                    isDone || isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border text-muted-foreground',
                  )}
                >
                  {isDone ? <Check className="size-4" /> : step}
                </span>
                <span className={cn('text-sm whitespace-nowrap', isActive ? 'font-medium' : 'text-muted-foreground')}>
                  {label}
                </span>
              </div>
              {step < STEPS.length && <span className={cn('h-px w-8 shrink-0', isDone ? 'bg-primary' : 'bg-border')} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
