import { createBrowserRouter } from 'react-router'
import { AppShell } from '@/shared/layout/app-shell'
import { LandingPage } from '@/pages/landing/LandingPage'
import { LoginPage } from '@/pages/login/LoginPage'
import { InicioPage } from '@/pages/inicio/InicioPage'
import { ProyectosPage } from '@/pages/proyectos/ProyectosPage'
import { NuevoProyectoPage } from '@/pages/proyectos/NuevoProyectoPage'
import { ProyectoDetallePage } from '@/pages/proyectos/ProyectoDetallePage'
import { ConfiguracionPage } from '@/pages/configuracion/ConfiguracionPage'
import { DocumentacionPage } from '@/pages/documentacion/DocumentacionPage'
import { useUserTier } from '@/features/user-tier/use-user-tier'

function ShellRoute() {
  const { email, tier } = useUserTier()
  return <AppShell email={email} tier={tier} />
}

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  {
    element: <ShellRoute />,
    children: [
      { path: 'inicio', element: <InicioPage /> },
      { path: 'proyectos', element: <ProyectosPage /> },
      { path: 'proyectos/nuevo', element: <NuevoProyectoPage /> },
      { path: 'proyectos/:id', element: <ProyectoDetallePage /> },
      { path: 'configuracion', element: <ConfiguracionPage /> },
      { path: 'documentacion', element: <DocumentacionPage /> },
    ],
  },
])
