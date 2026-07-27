import { useEffect, useState, type RefObject } from 'react'
import { useNavigate } from 'react-router'
import { X } from 'lucide-react'
import { Button } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'

export interface TourStep {
  title: string
  description: string
  href: string
}

interface GuidedTourProps {
  steps: TourStep[]
  targetRefs: RefObject<HTMLElement | null>[]
  onClose: () => void
}

function useTargetRect(el: HTMLElement | null) {
  const [rect, setRect] = useState<DOMRect | null>(null)

  useEffect(() => {
    function update() {
      setRect(el ? el.getBoundingClientRect() : null)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [el])

  return rect
}

export function GuidedTour({ steps, targetRefs, onClose }: GuidedTourProps) {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const rect = useTargetRect(targetRefs[index]?.current ?? null)

  useEffect(() => {
    navigate(steps[index].href)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!rect) return null

  const step = steps[index]
  const isLast = index === steps.length - 1
  const popoverLeft = Math.min(rect.left, window.innerWidth - 304)

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Cerrar navegación guiada"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />
      <div
        className="pointer-events-none absolute rounded-lg bg-primary/15 ring-2 ring-primary transition-all duration-300"
        style={{ top: rect.top - 4, left: rect.left - 4, width: rect.width + 8, height: rect.height + 8 }}
      />
      <div
        className="animate-step-fade-in absolute w-72 rounded-xl border border-border bg-background p-4 shadow-modal"
        style={{ top: rect.bottom + 12, left: popoverLeft }}
      >
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold">{step.title}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar navegación guiada"
            className="shrink-0 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground">{step.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <span key={i} className={cn('size-1.5 rounded-full', i === index ? 'bg-primary' : 'bg-muted')} />
            ))}
          </div>
          <div className="flex gap-2">
            {index > 0 && (
              <Button variant="outline" className="h-7 px-2.5 text-xs" onClick={() => setIndex((i) => i - 1)}>
                Anterior
              </Button>
            )}
            <Button className="h-7 px-2.5 text-xs" onClick={() => (isLast ? onClose() : setIndex((i) => i + 1))}>
              {isLast ? 'Listo' : 'Siguiente'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
