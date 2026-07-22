import { createBrowserRouter } from 'react-router'
import { AppShell } from '@/shared/layout/app-shell'
import { LandingPage } from '@/pages/landing/LandingPage'
import { LoginPage } from '@/pages/login/LoginPage'
import { ProyectosPage } from '@/pages/proyectos/ProyectosPage'
import { NuevoProyectoPage } from '@/pages/proyectos/NuevoProyectoPage'
import { ProyectoDetallePage } from '@/pages/proyectos/ProyectoDetallePage'
import { ConfiguracionPage } from '@/pages/configuracion/ConfiguracionPage'
import { useUserTier } from '@/features/user-tier/use-user-tier'
import type { Tier } from '@/data/user'

function ShellRoute() {
  const { email, tier, setTier } = useUserTier()
  return <AppShell email={email} tier={tier} onTierChange={(next) => setTier(next as Tier)} />
}

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  {
    element: <ShellRoute />,
    children: [
      { path: 'proyectos', element: <ProyectosPage /> },
      { path: 'proyectos/nuevo', element: <NuevoProyectoPage /> },
      { path: 'proyectos/:id', element: <ProyectoDetallePage /> },
      { path: 'configuracion', element: <ConfiguracionPage /> },
    ],
  },
])
