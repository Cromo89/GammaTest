import { LogOut, Search, X } from 'lucide-react'
import { Link, NavLink } from 'react-router'
import type { ReactNode } from 'react'
import { Badge, BrandMark } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import { navGroups } from './nav-config'
import { getInitials, NOTIFICATIONS } from './topbar-data'
import { LanguageMenu } from './language-menu'

interface MobileNavGroupsProps {
  onNavigate: () => void
}

function MobileNavGroups({ onNavigate }: MobileNavGroupsProps) {
  return (
    <div className="flex flex-col gap-5">
      {navGroups.map((group) => (
        <div key={group.label}>
          <p className="px-1 pb-1.5 text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
            {group.label}
          </p>
          <nav className="flex flex-col gap-1">
            {group.items.map(({ label, href, icon: Icon }) => (
              <NavLink
                key={href}
                to={href}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 rounded-lg px-2 py-2.5 text-sm transition-colors',
                    isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/60',
                  )
                }
              >
                <Icon className="size-4 shrink-0" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      ))}
    </div>
  )
}

interface MobileProfileProps {
  email: string
  tier: string
  onNavigate: () => void
}

function MobileProfile({ email, tier, onNavigate }: MobileProfileProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg px-1 py-2">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
        {getInitials(email)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm">{email}</p>
        <Badge variant="primary" className="mt-1 w-fit capitalize">
          {tier}
        </Badge>
      </div>
      <Link
        to="/login"
        onClick={onNavigate}
        aria-label="Cerrar sesión"
        className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <LogOut className="size-4" />
      </Link>
    </div>
  )
}

interface OverlayHeaderProps {
  title: ReactNode
  onClose: () => void
  closeLabel: string
}

function OverlayHeader({ title, onClose, closeLabel }: OverlayHeaderProps) {
  return (
    <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
      {title}
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <X className="size-5" />
      </button>
    </div>
  )
}

export function NotificationsOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background lg:hidden">
      <OverlayHeader
        title={<p className="font-heading text-base font-semibold">Notificaciones</p>}
        onClose={onClose}
        closeLabel="Cerrar notificaciones"
      />
      <div className="flex flex-col gap-1 p-4">
        {NOTIFICATIONS.map((notification) => (
          <div key={notification.id} className="rounded-lg px-2 py-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium">{notification.title}</span>
              <span className="shrink-0 text-xs text-muted-foreground">{notification.relativeLabel}</span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">{notification.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

interface MenuOverlayProps {
  value: string
  onChange: (value: string) => void
  email: string
  tier: string
  onClose: () => void
  language: string
  onLanguageChange: (code: string) => void
}

export function MenuOverlay({ value, onChange, email, tier, onClose, language, onLanguageChange }: MenuOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background lg:hidden">
      <OverlayHeader title={<BrandMark />} onClose={onClose} closeLabel="Cerrar menú" />

      <div className="flex flex-1 flex-col gap-6 p-4">
        <div className="flex h-10 items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 has-focus:border-primary">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Buscar proyectos, dominios o publicaciones..."
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>

        <MobileNavGroups onNavigate={onClose} />

        <LanguageMenu value={language} onChange={onLanguageChange} variant="block" />
      </div>

      <div className="p-4">
        <MobileProfile email={email} tier={tier} onNavigate={onClose} />
      </div>
    </div>
  )
}
