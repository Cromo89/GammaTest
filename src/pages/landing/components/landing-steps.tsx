import { useEffect, useRef, useState } from 'react'
import { cn } from '@/shared/lib/utils'
import { Reveal } from './reveal'

interface Step {
  n: string
  title: string
  description: string
}

const STEPS: Step[] = [
  { n: '01', title: 'Crea con IA', description: 'Genera tu sitio, prototipo o herramienta con tu asistente favorito.' },
  { n: '02', title: 'Sube el código', description: 'Carga un .zip con HTML, React/Vite o Next.js.' },
  { n: '03', title: 'Define su alcance', description: 'Elige permanencia, dominio y colaboradores.' },
  { n: '04', title: 'Publica y comparte', description: 'Obtén una URL lista para validar con tu equipo.' },
]

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    setIsDesktop(mql.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return isDesktop
}

function usePinnedSteps(count: number, enabled: boolean) {
  const pinRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!enabled) return

    function update() {
      const el = pinRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const p = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0
      setProgress(p)
      setActive(Math.min(count - 1, Math.floor(p * count)))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [enabled, count])

  function selectStep(index: number) {
    const el = pinRef.current
    if (!enabled || !el) {
      setActive(index)
      return
    }
    const rect = el.getBoundingClientRect()
    const scrollable = rect.height - window.innerHeight
    const target = rect.top + window.scrollY + (index / (count - 1)) * scrollable
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: target, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return { pinRef, active, progress, selectStep }
}

interface StepItemProps {
  step: Step
  isActive: boolean
  onSelect: () => void
}

function StepItem({ step, isActive, onSelect }: StepItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'group flex w-full items-center gap-5 rounded-xl p-5 text-left transition-all duration-500 ease-out',
        isActive ? 'translate-x-2 bg-muted/60' : 'hover:translate-x-1 hover:bg-muted/25',
      )}
    >
      <span
        className={cn(
          'font-mono text-3xl font-bold transition-colors duration-500 ease-out',
          isActive
            ? 'bg-gradient-to-r from-brand-teal via-brand-cyan to-brand-blue bg-clip-text text-transparent'
            : 'text-muted-foreground/30 group-hover:text-muted-foreground/60',
        )}
      >
        {step.n}
      </span>
      <span
        className={cn(
          'font-heading text-3xl font-semibold whitespace-nowrap uppercase transition-colors duration-500 ease-out',
          isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground/80',
        )}
      >
        {step.title}
      </span>
    </button>
  )
}

export function LandingSteps() {
  const isDesktop = useIsDesktop()
  const { pinRef, active, progress, selectStep } = usePinnedSteps(STEPS.length, isDesktop)
  const current = STEPS[active]
  const lineProgress = isDesktop ? progress : active / (STEPS.length - 1)

  return (
    <section id="como-funciona" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-0">
        <div
          ref={pinRef}
          className="relative"
          style={isDesktop ? { height: `${STEPS.length * 100}vh` } : undefined}
        >
          <div className="flex flex-col justify-center lg:sticky lg:top-24 lg:min-h-[calc(100vh-6rem)]">
            <Reveal blur className="text-left">
              <h2 className="max-w-xl font-heading text-4xl font-semibold tracking-tight">
                De la IA a producción en cuatro pasos
              </h2>
              <p className="mt-4 text-[15px] whitespace-nowrap text-muted-foreground">
                Gamma elimina la distancia entre una buena idea y las personas que necesitan verla.
              </p>
            </Reveal>

            <Reveal blur className="mt-6 grid w-full gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <div className="aspect-[21/9] w-full rounded-2xl bg-muted" />
                <div key={current.n} className="animate-step-fade-in mt-6">
                  <span className="font-mono text-xs font-medium tracking-[0.2em] text-brand-teal uppercase">
                    Paso {current.n}
                  </span>
                  <p className="mt-3 font-heading text-2xl leading-snug font-medium text-foreground">
                    {current.description}
                  </p>
                </div>
              </div>

              <div className="relative flex flex-col gap-5 pl-6">
                <div className="absolute top-0 bottom-0 left-0 w-px bg-border" />
                <div
                  className="absolute top-0 left-0 w-px bg-brand-teal"
                  style={{ height: `${lineProgress * 100}%` }}
                />
                {STEPS.map((step, index) => (
                  <StepItem
                    key={step.n}
                    step={step}
                    isActive={active === index}
                    onSelect={() => selectStep(index)}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
