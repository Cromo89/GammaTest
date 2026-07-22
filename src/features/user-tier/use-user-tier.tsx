import { createContext, useContext, useState, type ReactNode } from 'react'
import { currentUser, type Tier } from '@/data/user'

interface UserTierContextValue {
  email: string
  tier: Tier
  setTier: (tier: Tier) => void
}

const UserTierContext = createContext<UserTierContextValue | null>(null)

export function UserTierProvider({ children }: { children: ReactNode }) {
  const [tier, setTier] = useState<Tier>(currentUser.tier)

  return (
    <UserTierContext.Provider value={{ email: currentUser.email, tier, setTier }}>
      {children}
    </UserTierContext.Provider>
  )
}

export function useUserTier() {
  const context = useContext(UserTierContext)
  if (!context) throw new Error('useUserTier must be used within UserTierProvider')
  return context
}
