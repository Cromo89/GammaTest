import { ArrowDown } from 'lucide-react'
import { Link } from 'react-router'
import { Button, FlowingColorBend } from '@/shared/ui'
import { HeroHeading } from './hero-heading'

export function LandingHero() {
  return (
    <section className="relative isolate flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16 text-center">
      <FlowingColorBend fadeEdge="bottom" grainHighlightIntensity={0.35} />

      <span className="font-mono text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
        Engineering Office
      </span>

      <HeroHeading />

      <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-foreground">
        Gamma es el espacio de Cencosud para publicar, validar y compartir prototipos digitales creados con IA, sin
        preocuparte por infraestructura.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-white/25 text-white/70 hover:border-white hover:text-white"
        >
          <a href="#como-funciona">Descubrir cómo funciona</a>
        </Button>
        <Button asChild size="lg">
          <Link to="/login">Comenzar a publicar</Link>
        </Button>
      </div>

      <a
        href="#como-funciona"
        aria-label="Ir a la siguiente sección"
        className="absolute bottom-20 left-1/2 flex size-11 -translate-x-1/2 items-center justify-center rounded-full border border-brand-teal/40 text-brand-teal transition-colors hover:border-brand-teal hover:bg-brand-teal/10"
      >
        <ArrowDown className="animate-arrow-bounce size-5" />
      </a>
    </section>
  )
}
