import type { ReactNode } from 'react'
import { UserTierProvider } from '@/features/user-tier/use-user-tier'

export function Providers({ children }: { children: ReactNode }) {
  return <UserTierProvider>{children}</UserTierProvider>
}
