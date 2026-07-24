import { Eye, Link2, Server, type LucideIcon } from 'lucide-react'
import { Reveal } from './reveal'

interface ChecklistItem {
  icon: LucideIcon
  title: string
  description: string
}

const CHECKLIST: ChecklistItem[] = [
  {
    icon: Server,
    title: 'Sin infraestructura',
    description: 'No necesitas configurar servidores, pipelines ni certificados.',
  },
  {
    icon: Link2,
    title: 'URL corporativa',
    description: 'Cada proyecto obtiene un dominio simple para compartir.',
  },
  {
    icon: Eye,
    title: 'Visibilidad y control',
    description: 'Versiones, accesos y permanencia desde un único lugar.',
  },
]

export function LandingProblem() {
  return (
    <section id="crear-es-rapido" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <Reveal blur className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-4xl font-semibold tracking-tight">
          Crear es rápido.
          <br />
          <span className="bg-gradient-to-r from-brand-teal via-brand-cyan to-brand-blue bg-clip-text text-transparent">
            Publicar también debería serlo.
          </span>
        </h2>
        <p className="mt-4 text-[15px] text-muted-foreground">
          Una experiencia creada con IA no debería quedarse atrapada en tu computador, ni requerir días de
          configuración para ser compartida.
        </p>
      </Reveal>

      <Reveal blur delay={150} className="mt-14 grid gap-4 sm:grid-cols-3">
        {CHECKLIST.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center rounded-xl border border-border p-6 text-center"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-teal/10 text-brand-teal">
              <item.icon className="size-5" />
            </span>
            <p className="mt-4 text-sm font-semibold">{item.title}</p>
            <p className="mt-1.5 text-xs text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
