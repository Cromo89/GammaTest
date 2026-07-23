import { useState } from 'react'
import { Atom, Code2, Layers, type LucideIcon } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { Reveal } from './reveal'

interface Format {
  icon: LucideIcon
  title: string
  detail: string
  tag: string
  example: string
}

const FORMATS: Format[] = [
  {
    icon: Code2,
    title: 'HTML',
    detail: 'Subes un .zip o arrastras la carpeta con tu index.html — Gamma lo publica tal cual, sin build ni configuración.',
    tag: 'Publicación inmediata',
    example: 'index.html',
  },
  {
    icon: Atom,
    title: 'React / Vite',
    detail: 'Gamma detecta el proyecto, instala las dependencias y corre el build automáticamente antes de publicar la versión final.',
    tag: 'Build automático',
    example: 'npm run build',
  },
  {
    icon: Layers,
    title: 'Next.js',
    detail: 'Soporta rutas, server components y assets estáticos — el mismo proyecto que corres local queda listo para compartir.',
    tag: 'Despliegue optimizado',
    example: 'next build',
  },
]

export function LandingFormats() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = FORMATS[activeIndex]

  return (
    <section id="formatos" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <Reveal className="max-w-xl">
        <h2 className="font-heading text-4xl font-semibold tracking-tight">Tu stack, sin fricción.</h2>
        <p className="mt-4 text-[15px] text-muted-foreground">
          No necesitas adaptar tu proyecto a una tecnología propietaria.
        </p>
      </Reveal>

      <Reveal delay={150} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4">
        <div className="flex gap-3 sm:w-56 sm:flex-none sm:flex-col">
          {FORMATS.map((format, index) => (
            <button
              key={format.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                'flex flex-1 items-center gap-3 rounded-xl border p-4 text-left transition-colors sm:flex-none',
                index === activeIndex
                  ? 'border-brand-teal bg-brand-teal/5'
                  : 'border-border hover:border-brand-teal/40',
              )}
            >
              <span
                className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-lg',
                  index === activeIndex ? 'bg-brand-teal/15 text-brand-teal' : 'bg-muted text-muted-foreground',
                )}
              >
                <format.icon className="size-4" />
              </span>
              <span className="font-heading text-sm font-semibold">{format.title}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 rounded-2xl border border-border p-8">
          <div className="flex size-12 items-center justify-center rounded-xl border border-brand-teal/40 bg-brand-teal/10 text-brand-teal">
            <active.icon className="size-6" />
          </div>
          <h3 className="mt-5 font-heading text-xl font-semibold">{active.title}</h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">{active.detail}</p>
          <div className="mt-6 flex items-center justify-between rounded-lg border border-border bg-muted/60 px-4 py-2.5">
            <span className="font-mono text-xs text-muted-foreground">{active.example}</span>
            <span className="text-[10px] font-medium text-brand-teal uppercase">{active.tag}</span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
