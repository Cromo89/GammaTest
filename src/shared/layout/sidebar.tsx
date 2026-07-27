import { NavLink } from 'react-router'
import { BrandMark } from '@/shared/ui'
import { navGroups, type NavItem } from './nav-config'
import { cn } from '@/shared/lib/utils'

function NavLinkItem({ label, href, icon: Icon }: NavItem) {
  return (
    <NavLink
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
  return (
    <aside className="hidden h-screen w-60 shrink-0 flex-col gap-6 border-r border-sidebar-accent bg-sidebar px-3 py-4 text-sidebar-foreground lg:flex">
      <div className="px-2">
        <BrandMark />
      </div>

      <div className="flex flex-col gap-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-2 pb-1.5 text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
              {group.label}
            </p>
            <nav className="flex flex-col gap-1">
              {group.items.map((item) => (
                <NavLinkItem key={item.href} {...item} />
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  )
}
