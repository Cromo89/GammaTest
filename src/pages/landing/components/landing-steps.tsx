import { useEffect, useRef, useState } from 'react'
import { Rocket, SlidersHorizontal, Sparkles, Upload, type LucideIcon } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { FlowingColorBend } from '@/shared/ui'
import { Reveal } from './reveal'

interface Step {
  n: string
  icon: LucideIcon
  title: string
  description: string
}

const STEPS: Step[] = [
  { n: '01', icon: Sparkles, title: 'Crea con IA', description: 'Genera tu sitio, prototipo o herramienta con tu asistente favorito.' },
  { n: '02', icon: Upload, title: 'Sube el código', description: 'Carga un .zip con HTML, React/Vite o Next.js.' },
  { n: '03', icon: SlidersHorizontal, title: 'Define su alcance', description: 'Elige permanencia, dominio y colaboradores.' },
  { n: '04', icon: Rocket, title: 'Publica y comparte', description: 'Obtén una URL lista para validar con tu equipo.' },
]

function StepConnector() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="ml-12 h-8 w-px overflow-hidden">
      <div
        className={cn(
          'h-full w-px origin-top bg-brand-teal/40 transition-transform duration-700 ease-out',
          visible ? 'scale-y-100' : 'scale-y-0',
        )}
      />
    </div>
  )
}

export function LandingSteps() {
  return (
    <section id="como-funciona" className="relative isolate overflow-hidden border-y border-border bg-muted/40">
      <FlowingColorBend fadeEdge="top" showGrain={false} />

      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="font-heading text-4xl font-semibold tracking-tight">
            De la IA a producción en cuatro pasos
          </h2>
          <p className="mt-4 text-[15px] text-muted-foreground">
            Gamma elimina la distancia entre una buena idea y las personas que necesitan verla.
          </p>
        </Reveal>

        <div className="mx-auto mt-20 max-w-xl">
          {STEPS.map((step, i) => (
            <div key={step.n}>
              <Reveal
                intensity="subtle"
                className="rounded-2xl border border-brand-teal/30 p-6 transition-colors hover:border-brand-teal/60"
              >
                <div className="flex items-center gap-4">
                  <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-brand-teal bg-background text-brand-teal">
                    <step.icon className="size-5" />
                  </span>
                  <span className="font-mono text-base font-semibold text-brand-teal">{step.n}</span>
                </div>
                <div className="mt-4">
                  <h3 className="font-heading text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-[15px] text-muted-foreground">{step.description}</p>
                </div>
              </Reveal>
              {i < STEPS.length - 1 && <StepConnector />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
