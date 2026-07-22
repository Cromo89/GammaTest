import { Link } from 'react-router'
import { BrandMark, Button } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import { useActiveSection } from './use-active-section'

const SECTIONS = [
  { id: 'como-funciona', label: 'Cómo funciona' },
  { id: 'formatos', label: 'Formatos' },
  { id: 'permanencia', label: 'Permanencia' },
]

export function LandingNav() {
  const activeId = useActiveSection(SECTIONS.map((s) => s.id))

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/85 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-6xl items-center px-6 py-4">
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
          <Button asChild size="lg">
            <Link to="/login">Ir a mi espacio</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
