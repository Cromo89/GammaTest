import { useState } from 'react'
import { Outlet } from 'react-router'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'
import { MobileNav } from './mobile-nav'

interface AppShellProps {
  email: string
  tier: string
  onTierChange: (tier: string) => void
}

export function AppShell({ email, tier, onTierChange }: AppShellProps) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar value={searchQuery} onChange={setSearchQuery} email={email} tier={tier} />
        <MobileNav value={searchQuery} onChange={setSearchQuery} email={email} tier={tier} />
        <main className="flex-1 overflow-y-auto px-4 py-6 lg:px-10 lg:py-8">
          <Outlet context={{ tier, onTierChange, searchQuery }} />
        </main>
      </div>
    </div>
  )
}
