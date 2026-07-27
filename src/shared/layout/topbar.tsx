import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { Bell, ChevronDown, LogOut, Search } from 'lucide-react'
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

interface TopbarProps {
  value: string
  onChange: (value: string) => void
  email: string
  tier: string
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

export function Topbar({ value, onChange, email, tier }: TopbarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <header className="sticky top-0 z-10 hidden h-16 shrink-0 items-center gap-4 border-b border-border bg-background/90 px-8 backdrop-blur-lg lg:flex">
      <div className="flex h-9 w-full max-w-md items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 has-focus:border-primary">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <input
          ref={inputRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Buscar proyectos, dominios o publicaciones..."
          className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <NotificationsMenu />

        <div className="relative">
          <select
            className="h-9 appearance-none rounded-lg border border-border bg-transparent py-2 pr-8 pl-2 text-sm text-foreground"
            defaultValue="es"
          >
            <option value="es">Español</option>
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        <ProfileMenu email={email} tier={tier} />
      </div>
    </header>
  )
}
