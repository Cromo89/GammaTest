import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Moon, Sun } from 'lucide-react'
import { BrandMark, Button } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import { useActiveSection } from './use-active-section'
import type { LandingTheme } from './use-landing-theme'

const SECTIONS = [
  { id: 'como-funciona', label: 'Cómo funciona' },
  { id: 'formatos', label: 'Formatos' },
  { id: 'permanencia', label: 'Permanencia' },
]

interface LandingNavProps {
  theme: LandingTheme
  onToggleTheme: () => void
}

export function LandingNav({ theme, onToggleTheme }: LandingNavProps) {
  const activeId = useActiveSection(SECTIONS.map((s) => s.id))
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-10 border-b transition-colors duration-300',
        scrolled ? 'border-border bg-background/85 backdrop-blur-lg' : 'border-transparent bg-transparent',
      )}
    >
      <div className="flex w-full items-center px-8 py-4">
        <Link to="/" className="flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <BrandMark />
        </Link>
        <nav className="ml-auto flex items-center gap-7">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={cn(
                'hidden text-xs transition-colors sm:block',
                activeId === section.id ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {section.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-foreground/25 text-foreground/70 hover:border-foreground hover:text-foreground"
          >
            <Link to="/login">Ir a mi espacio</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
