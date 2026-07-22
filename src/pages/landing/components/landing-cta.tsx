import { Link } from 'react-router'
import { Button, FlowingColorBend } from '@/shared/ui'
import { Reveal } from './reveal'
import { StarBorder } from './star-border'

export function LandingCta() {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-24">
      <FlowingColorBend fadeEdge="top" showGrain={false} />

      <Reveal className="mx-auto max-w-6xl">
        <StarBorder>
          <div className="relative overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--color-brand-blue)_40%,transparent),transparent_65%)] px-8 py-16 text-center">
            <h2 className="mx-auto max-w-xl font-heading text-4xl font-semibold tracking-tight">
              Tu próxima idea puede estar online hoy.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] text-muted-foreground">
              ¿Tienes algo que tu equipo debería ver? Publícalo en minutos, sin tickets, sin servidores y sin salir del
              ecosistema Cencosud.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/login">Entrar a Gamma</Link>
            </Button>
          </div>
        </StarBorder>
      </Reveal>
    </section>
  )
}
