import { useState } from 'react'
import { Bell, Menu, Moon, Sun } from 'lucide-react'
import { BrandMark } from '@/shared/ui'
import type { DashboardTheme } from './use-dashboard-theme'
import { MenuOverlay, NotificationsOverlay } from './mobile-nav-overlays'

interface MobileNavProps {
  value: string
  onChange: (value: string) => void
  email: string
  tier: string
  theme: DashboardTheme
  onToggleTheme: () => void
  language: string
  onLanguageChange: (code: string) => void
}

export function MobileNav({ value, onChange, email, tier, theme, onToggleTheme, language, onLanguageChange }: MobileNavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-lg lg:hidden">
        <BrandMark />
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setNotificationsOpen(true)}
            aria-label="Notificaciones"
            className="relative flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Bell className="size-5" />
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" />
          </button>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      {notificationsOpen && <NotificationsOverlay onClose={() => setNotificationsOpen(false)} />}

      {menuOpen && (
        <MenuOverlay
          value={value}
          onChange={onChange}
          email={email}
          tier={tier}
          onClose={() => setMenuOpen(false)}
          language={language}
          onLanguageChange={onLanguageChange}
        />
      )}
    </>
  )
}
