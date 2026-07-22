import { Outlet } from 'react-router'
import { Sidebar } from './sidebar'

interface AppShellProps {
  email: string
  tier: string
  onTierChange: (tier: string) => void
}

export function AppShell({ email, tier, onTierChange }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar email={email} tier={tier} />
      <main className="flex-1 overflow-y-auto px-10 py-8">
        <Outlet context={{ tier, onTierChange }} />
      </main>
    </div>
  )
}
