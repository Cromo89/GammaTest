import { ArrowDown } from 'lucide-react'
import { Link } from 'react-router'
import { Button, FlowingColorBend } from '@/shared/ui'
import { HeroHeading } from './hero-heading'

export function LandingHero() {
  return (
    <section className="relative isolate flex min-h-dvh flex-col items-center overflow-hidden px-6 pt-24 pb-10 text-center">
      <FlowingColorBend fadeEdge="bottom" grainHighlightIntensity={0.35} speed={0.00006} />

      <div className="flex flex-1 flex-col items-center justify-center">
        <span className="font-mono text-xs font-medium tracking-[0.2em] text-[color:var(--hero-eyebrow-color)] uppercase">
          Engineering Office
        </span>

        <HeroHeading />

        <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-foreground">
          Gamma es el espacio de Cencosud para publicar, validar y compartir prototipos digitales creados con IA, sin
          preocuparte por infraestructura.
        </p>

        <div className="mt-8 flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full border-foreground/25 text-foreground/70 hover:border-foreground hover:text-foreground sm:w-auto"
          >
            <a href="#como-funciona">Descubrir cómo funciona</a>
          </Button>
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to="/login">Comenzar a publicar</Link>
          </Button>
        </div>
      </div>

      <a
        href="#crear-es-rapido"
        aria-label="Ir a la siguiente sección"
        className="mt-8 flex size-11 shrink-0 items-center justify-center rounded-full border border-brand-teal/40 text-brand-teal transition-colors hover:border-brand-teal hover:bg-brand-teal/10"
      >
        <ArrowDown className="animate-arrow-bounce size-5" />
      </a>
    </section>
  )
}
