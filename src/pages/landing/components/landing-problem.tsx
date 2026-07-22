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
    <section className="mx-auto grid max-w-6xl gap-14 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <Reveal className="max-w-xl">
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
        <p className="mt-6 max-w-md border-l border-brand-teal py-2 pl-6 text-base text-foreground/85">
          Gamma convierte un archivo en una URL segura y compartible dentro del ecosistema Cencosud.
        </p>
      </Reveal>

      <Reveal delay={150} className="flex flex-col gap-2.5">
        {CHECKLIST.map((item) => (
          <div key={item.title} className="flex items-center gap-3 rounded-xl border border-border p-4">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-teal/10 text-brand-teal">
              <item.icon className="size-4" />
            </span>
            <div>
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
