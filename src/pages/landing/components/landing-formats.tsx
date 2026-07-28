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
    icon: Atom,
    title: 'React / Vite',
    detail: 'Gamma detecta el proyecto, instala las dependencias y corre el build automáticamente antes de publicar la versión final.',
    tag: 'Build automático',
    example: 'npm run build',
  },
  {
    icon: Code2,
    title: 'HTML',
    detail: 'Subes un .zip o arrastras la carpeta con tu index.html — Gamma lo publica tal cual, sin build ni configuración.',
    tag: 'Publicación inmediata',
    example: 'index.html',
  },
  {
    icon: Layers,
    title: 'Next.js',
    detail: 'Soporta rutas, server components y assets estáticos — el mismo proyecto que corres local queda listo para compartir.',
    tag: 'Despliegue optimizado',
    example: 'next build',
  },
]

function FormatCell({ format, className }: { format: Format; className?: string }) {
  return (
    <div className={cn('flex flex-col p-8', className)}>
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
  )
}

export function LandingFormats() {
  return (
    <section id="formatos" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 3xl:max-w-[1600px]">
      <Reveal blur className="grid overflow-hidden rounded-2xl border border-border sm:grid-cols-2">
        <div className="flex flex-col justify-center border-b border-l-2 border-border border-l-brand-teal p-8 sm:border-r">
          <h2 className="font-heading text-[28px] leading-[1.05] font-semibold tracking-tight sm:text-4xl sm:leading-[2.5rem]">
            Tu stack, sin fricción.
          </h2>
          <p className="mt-4 text-[15px] text-muted-foreground">No necesitas adaptar tu proyecto a una tecnología propietaria.</p>
        </div>
        <FormatCell format={FORMATS[0]} className="border-b border-border" />
        <FormatCell format={FORMATS[1]} className="border-b border-border sm:border-b-0 sm:border-r" />
        <FormatCell format={FORMATS[2]} />
      </Reveal>
    </section>
  )
}
