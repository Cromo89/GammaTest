import { FlaskConical, Sprout, Trophy, type LucideIcon } from 'lucide-react'
import { Reveal } from './reveal'

interface Level {
  id: string
  icon: LucideIcon
  label: string
  purpose: string
  duration: string
  description: string
  features: string[]
  minHeight: string
}

const LEVELS: Level[] = [
  {
    id: 'alpha',
    icon: Sprout,
    label: 'Alpha',
    purpose: 'Explorar',
    duration: '7 días',
    description: 'Ideas tempranas, pruebas rápidas y validaciones internas.',
    features: ['URL compartible', 'Feedback inmediato', 'Renovable cuando lo necesites'],
    minHeight: '19rem',
  },
  {
    id: 'beta',
    icon: FlaskConical,
    label: 'Beta',
    purpose: 'Validar',
    duration: '30 días',
    description: 'Pruebas con usuarios y experiencias en evolución.',
    features: ['Historial de publicaciones', 'Colaboración de equipo', 'Analítica de visitas'],
    minHeight: '22rem',
  },
  {
    id: 'gamma',
    icon: Trophy,
    label: 'Gamma',
    purpose: 'Consolidar',
    duration: 'Indefinido',
    description: 'Soluciones validadas que generan valor continuo.',
    features: ['Dominio permanente', 'Gobierno y trazabilidad', 'Lista para escalar'],
    minHeight: '25rem',
  },
]

export function LandingPermanence() {
  return (
    <section id="permanencia" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <Reveal className="max-w-xl">
        <h2 className="font-heading text-4xl font-semibold tracking-tight">Tu proyecto madura en tres niveles</h2>
        <p className="mt-4 text-[15px] text-muted-foreground">
          La permanencia crece con la madurez de la experiencia — no es algo que eliges una vez, es donde estás hoy.
        </p>
      </Reveal>

      <div className="mt-16 flex flex-col items-stretch gap-4 sm:flex-row sm:items-end">
        {LEVELS.map((level, index) => (
          <Reveal
            key={level.id}
            delay={150 + index * 120}
            style={{ minHeight: level.minHeight }}
            className="flex flex-1 flex-col rounded-2xl border border-border p-6"
          >
            <div className="flex size-12 items-center justify-center rounded-xl border border-brand-teal/40 bg-brand-teal/10 text-brand-teal">
              <level.icon className="size-6" />
            </div>
            <div className="mt-5 flex items-baseline gap-2">
              <h3 className="font-heading text-xl font-semibold">{level.label}</h3>
              <span className="text-xs text-muted-foreground">· {level.purpose}</span>
            </div>
            <p className="mt-1 font-mono text-xs text-brand-teal">{level.duration}</p>
            <p className="mt-3 text-sm text-muted-foreground">{level.description}</p>
            <ul className="mt-auto flex flex-col gap-1.5 pt-4 text-xs text-foreground/80">
              {level.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
