import { Link } from 'react-router'
import { Bell, LogOut, Moon, Sun } from 'lucide-react'
import {
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui'
import { getInitials, NOTIFICATIONS } from './topbar-data'
import type { DashboardTheme } from './use-dashboard-theme'
import { LanguageMenu } from './language-menu'
import { CommandPalette } from './command-palette'

interface TopbarProps {
  email: string
  tier: string
  theme: DashboardTheme
  onToggleTheme: () => void
  language: string
  onLanguageChange: (code: string) => void
}

function ThemeToggle({ theme, onToggleTheme }: { theme: DashboardTheme; onToggleTheme: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggleTheme}
      aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}

function NotificationsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Notificaciones"
          className="relative flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-80">
        <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {NOTIFICATIONS.map((notification) => (
          <DropdownMenuItem key={notification.id} className="flex-col items-start gap-0.5">
            <div className="flex w-full items-center justify-between gap-2">
              <span className="font-medium">{notification.title}</span>
              <span className="shrink-0 text-xs text-muted-foreground">{notification.relativeLabel}</span>
            </div>
            <p className="text-xs text-muted-foreground">{notification.description}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface ProfileMenuProps {
  email: string
  tier: string
}

function ProfileMenu({ email, tier }: ProfileMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="flex items-center rounded-full p-0.5 transition-colors hover:bg-muted">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            {getInitials(email)}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="px-2.5 py-2">
          <p className="truncate text-xs text-muted-foreground">{email}</p>
          <Badge variant="primary" className="mt-1.5 w-fit capitalize">
            {tier}
          </Badge>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/login">
            <LogOut className="size-4" />
            Cerrar sesión
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Topbar({ email, tier, theme, onToggleTheme, language, onLanguageChange }: TopbarProps) {
  return (
    <header className="sticky top-0 z-10 hidden h-16 shrink-0 items-center gap-4 border-b border-border bg-background/90 px-8 backdrop-blur-lg lg:flex">
      <CommandPalette />

      <div className="ml-auto flex items-center gap-3">
        <NotificationsMenu />
        <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
        <LanguageMenu value={language} onChange={onLanguageChange} />
        <ProfileMenu email={email} tier={tier} />
      </div>
    </header>
  )
}
