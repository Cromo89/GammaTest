import { useRef, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { Compass } from 'lucide-react'
import { BrandMark } from '@/shared/ui'
import { navGroups, type NavItem } from './nav-config'
import { cn } from '@/shared/lib/utils'
import { GuidedTour, type TourStep } from './guided-tour'

const TOUR_STEPS: TourStep[] = [
  {
    title: 'Inicio',
    href: '/inicio',
    description:
      'Todo lo que está publicando tu equipo: proyectos activos, avisos de expiración próxima y estadísticas generales del portal.',
  },
  {
    title: 'Mis proyectos',
    href: '/proyectos',
    description:
      'Tus propios proyectos. Desde acá creas uno nuevo, revisas su historial de deploys y gestionas su URL pública.',
  },
  {
    title: 'Configuración',
    href: '/configuracion',
    description: 'Tu nivel de permanencia (tier) actual, tu información de cuenta y las solicitudes de cambio de nivel.',
  },
  {
    title: 'Documentación',
    href: '/documentacion',
    description: 'Guías y referencias para entender cómo funciona Gamma: formatos soportados, niveles de permanencia y más.',
  },
]

interface NavLinkItemProps extends NavItem {
  tourRef: (el: HTMLAnchorElement | null) => void
}

function NavLinkItem({ label, href, icon: Icon, tourRef }: NavLinkItemProps) {
  return (
    <NavLink
      ref={tourRef}
      to={href}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors',
          isActive
            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
            : 'text-sidebar-foreground hover:bg-sidebar-accent/50',
        )
      }
    >
      <Icon className="size-4 shrink-0" />
      {label}
    </NavLink>
  )
}

export function Sidebar() {
  const tourRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [tourActive, setTourActive] = useState(false)
  let flatIndex = -1

  return (
    <aside className="hidden h-screen w-60 shrink-0 flex-col gap-6 border-r border-sidebar-accent bg-sidebar px-3 py-4 text-sidebar-foreground lg:flex">
      <Link to="/inicio" className="px-2">
        <BrandMark />
      </Link>

      <div className="flex flex-1 flex-col gap-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-2 pb-1.5 text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
              {group.label}
            </p>
            <nav className="flex flex-col gap-1">
              {group.items.map((item) => {
                flatIndex += 1
                const index = flatIndex
                return (
                  <NavLinkItem
                    key={item.href}
                    {...item}
                    tourRef={(el) => {
                      tourRefs.current[index] = el
                    }}
                  />
                )
              })}
            </nav>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setTourActive(true)}
        className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
      >
        <Compass className="size-4 shrink-0" />
        Navegación guiada
      </button>

      {tourActive && <GuidedTour steps={TOUR_STEPS} targetRefs={tourRefs.current.map((el) => ({ current: el }))} onClose={() => setTourActive(false)} />}
    </aside>
  )
}
