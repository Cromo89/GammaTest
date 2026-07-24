import { LandingNav } from './components/landing-nav'
import { LandingHero } from './components/landing-hero'
import { LandingProblem } from './components/landing-problem'
import { LandingSteps } from './components/landing-steps'
import { LandingFormats } from './components/landing-formats'
import { LandingPermanence } from './components/landing-permanence'
import { LandingCta } from './components/landing-cta'
import { LandingFooter } from './components/landing-footer'
import { ScrollToTop } from './components/scroll-to-top'
import { useLandingTheme } from './components/use-landing-theme'

export function LandingPage() {
  const { theme, toggleTheme } = useLandingTheme()

  return (
    <div className="group/landing bg-background text-foreground" data-theme={theme}>
      <LandingNav theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <LandingHero />
        <LandingProblem />
        <LandingSteps />
        <LandingFormats />
        <LandingPermanence />
        <LandingCta />
      </main>
      <LandingFooter />
      <ScrollToTop />
    </div>
  )
}
