import { Link, NavLink } from 'react-router'
import { LogOut, Sparkles } from 'lucide-react'
import { Badge } from '@/shared/ui'
import { navItems } from './nav-config'
import { cn } from '@/shared/lib/utils'

interface SidebarProps {
  email: string
  tier: string
}

export function Sidebar({ email, tier }: SidebarProps) {
  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col justify-between border-r border-sidebar-accent bg-sidebar px-3 py-4 text-sidebar-foreground">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 px-2">
          <Sparkles className="size-5 text-primary" />
          <span className="font-heading text-base font-semibold">Gamma</span>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ label, href, icon: Icon }) => (
            <NavLink
              key={href}
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
              <Icon className="size-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-2 px-2">
        <span className="truncate text-xs text-muted-foreground">{email}</span>
        <Badge variant="primary" className="w-fit capitalize">
          {tier}
        </Badge>
        <select
          className="rounded-lg border border-border bg-transparent px-2 py-1.5 text-sm text-sidebar-foreground"
          defaultValue="es"
        >
          <option value="es">Español</option>
        </select>
        <Link
          to="/login"
          className="mt-2 flex items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/50"
        >
          <LogOut className="size-4" />
          Cerrar sesión
        </Link>
      </div>
    </aside>
  )
}
