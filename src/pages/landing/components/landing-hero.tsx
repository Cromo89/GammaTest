import { Link } from 'react-router'
import { Button, FlowingColorBend } from '@/shared/ui'
import { HeroHeading } from './hero-heading'

export function LandingHero() {
  return (
    <section className="relative isolate overflow-hidden px-6 pt-28 pb-24 text-center">
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
        <Button asChild size="lg">
          <Link to="/login">Comenzar a publicar</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="hover:border-brand-cyan/50">
          <a href="#como-funciona">Descubrir cómo funciona</a>
        </Button>
      </div>

      <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-success/25 bg-success/[0.06] px-4 py-2 text-xs text-foreground/90">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-success" />
        </span>
        Disponible para equipos Cencosud · Sin configuración de servidores
      </div>
    </section>
  )
}
