import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Menu, Moon, Sun, X } from 'lucide-react'
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

interface MobileMenuProps {
  activeId: string | null
  theme: LandingTheme
  onToggleTheme: () => void
  onClose: () => void
}

function MobileMenu({ activeId, theme, onToggleTheme, onClose }: MobileMenuProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background sm:hidden">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-6">
        <BrandMark />
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar menú"
          className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="size-5" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-6">
        {SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={onClose}
            className={cn(
              'rounded-lg px-3 py-3 text-lg font-medium transition-colors',
              activeId === section.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {section.label}
          </a>
        ))}
      </nav>

      <div className="flex flex-col gap-3 border-t border-border p-6">
        <button
          type="button"
          onClick={onToggleTheme}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          {theme === 'dark' ? 'Tema claro' : 'Tema oscuro'}
        </button>
        <Button asChild size="lg" className="w-full" onClick={onClose}>
          <Link to="/login">Ir a mi espacio</Link>
        </Button>
      </div>
    </div>
  )
}

export function LandingNav({ theme, onToggleTheme }: LandingNavProps) {
  const activeId = useActiveSection(SECTIONS.map((s) => s.id))
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
      <div className="flex w-full items-center px-6 py-4 sm:px-8">
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
            className="hidden border-foreground/25 text-foreground/70 hover:border-foreground hover:text-foreground sm:inline-flex"
          >
            <Link to="/login">Ir a mi espacio</Link>
          </Button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:hidden"
          >
            <Menu className="size-5" />
          </button>
        </nav>
      </div>

      {menuOpen && (
        <MobileMenu
          activeId={activeId}
          theme={theme}
          onToggleTheme={onToggleTheme}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </header>
  )
}
