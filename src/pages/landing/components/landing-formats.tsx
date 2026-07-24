import { Atom, Code2, Layers, type LucideIcon } from 'lucide-react'
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
  return (
    <section id="formatos" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <Reveal blur className="max-w-xl">
        <h2 className="font-heading text-4xl font-semibold tracking-tight">Tu stack, sin fricción.</h2>
        <p className="mt-4 text-[15px] text-muted-foreground">
          No necesitas adaptar tu proyecto a una tecnología propietaria.
        </p>
      </Reveal>

      <Reveal blur delay={150} className="mt-10 grid gap-4 sm:grid-cols-3">
        {FORMATS.map((format) => (
          <div key={format.title} className="flex flex-col rounded-2xl border border-border p-8">
            <div className="flex size-12 items-center justify-center rounded-xl border border-brand-teal/40 bg-brand-teal/10 text-brand-teal">
              <format.icon className="size-6" />
            </div>
            <h3 className="mt-5 font-heading text-xl font-semibold">{format.title}</h3>
            <p className="mt-2 mb-6 text-sm text-muted-foreground">{format.detail}</p>
            <div className="mt-auto flex items-center justify-between rounded-lg border border-border bg-muted/60 px-4 py-2.5">
              <span className="font-mono text-xs text-muted-foreground">{format.example}</span>
              <span className="text-[10px] font-medium text-brand-teal uppercase">{format.tag}</span>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
