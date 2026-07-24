import { Link } from 'react-router'
import { Button } from '@/shared/ui'
import { Reveal } from './reveal'

export function LandingCta() {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-24">
      <Reveal blur className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-r from-brand-teal via-brand-cyan to-brand-blue p-px">
        <div className="relative overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--color-brand-blue)_40%,transparent),transparent_65%),linear-gradient(var(--background),var(--background))] px-8 py-16 text-center">
          <span className="font-mono text-xs font-medium tracking-[0.2em] text-brand-teal uppercase group-data-[theme=light]/landing:text-brand-blue">
            Empieza ahora
          </span>
          <h2 className="mx-auto mt-4 max-w-xl font-heading text-4xl font-semibold tracking-tight">
            Tu próxima idea puede estar online hoy.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] text-foreground">
            ¿Tienes algo que tu equipo debería ver? Publícalo en minutos, sin tickets, sin servidores y sin salir del
            ecosistema Cencosud.
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="mt-8 border-foreground/25 text-foreground/70 hover:border-foreground hover:text-foreground"
          >
            <Link to="/login">Entrar a Gamma</Link>
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
