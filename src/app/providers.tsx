import type { ReactNode } from 'react'
import { UserTierProvider } from '@/features/user-tier/use-user-tier'
import { ProyectosProvider } from '@/features/proyectos/use-proyectos'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <UserTierProvider>
      <ProyectosProvider>{children}</ProyectosProvider>
    </UserTierProvider>
  )
}
