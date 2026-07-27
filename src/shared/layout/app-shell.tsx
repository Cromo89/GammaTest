import { useState } from 'react'
import { Outlet } from 'react-router'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'
import { MobileNav } from './mobile-nav'
import { useDashboardTheme } from './use-dashboard-theme'

interface AppShellProps {
  email: string
  tier: string
}

export function AppShell({ email, tier }: AppShellProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const { theme, toggleTheme } = useDashboardTheme()

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground" data-theme={theme}>
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          value={searchQuery}
          onChange={setSearchQuery}
          email={email}
          tier={tier}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <MobileNav
          value={searchQuery}
          onChange={setSearchQuery}
          email={email}
          tier={tier}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <main className="flex-1 overflow-y-auto px-4 py-6 lg:px-10 lg:py-8">
          <Outlet context={{ tier, searchQuery, email }} />
        </main>
      </div>
    </div>
  )
}
