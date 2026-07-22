import { LandingNav } from './components/landing-nav'
import { LandingHero } from './components/landing-hero'
import { LandingProblem } from './components/landing-problem'
import { LandingSteps } from './components/landing-steps'
import { LandingFormats } from './components/landing-formats'
import { LandingPermanence } from './components/landing-permanence'
import { LandingCta } from './components/landing-cta'
import { LandingFooter } from './components/landing-footer'

export function LandingPage() {
  return (
    <div className="bg-background">
      <LandingNav />
      <main>
        <LandingHero />
        <LandingProblem />
        <LandingSteps />
        <LandingFormats />
        <LandingPermanence />
        <LandingCta />
      </main>
      <LandingFooter />
    </div>
  )
}
