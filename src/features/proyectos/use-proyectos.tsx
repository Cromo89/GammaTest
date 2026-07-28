import { createContext, useContext, useState, type ReactNode } from 'react'
import { proyectos as seedProyectos, type Deploy, type Proyecto } from '@/data/proyectos'
import { formatDateTime } from '@/shared/lib/utils'

interface ProyectosContextValue {
  proyectos: Proyecto[]
  deleteProyecto: (id: string) => void
  publishNewVersion: (id: string) => void
  rollbackDeploy: (projectId: string, deployId: string) => void
  toggleDeployStatus: (projectId: string, deployId: string) => void
  extendDeployTtl: (projectId: string, deployId: string, days: 1 | 3 | 7 | 'reset') => void
}

const ProyectosContext = createContext<ProyectosContextValue | null>(null)

function buildDeploy(proyecto: Proyecto): Deploy {
  const now = new Date()
  const expiresAt = new Date(now.getTime() + proyecto.hoursRemaining * 60 * 60 * 1000)

  return {
    id: `d-${now.getTime()}`,
    hash: Math.random().toString(16).slice(2, 10),
    status: 'online',
    isCurrent: true,
    type: proyecto.type,
    version: `v${proyecto.deploys.length + 1}`,
    relativeLabel: 'ahora mismo',
    expiresAtLabel: formatDateTime(expiresAt.toISOString()),
    ttlPercent: 100,
  }
}

export function ProyectosProvider({ children }: { children: ReactNode }) {
  const [proyectos, setProyectos] = useState<Proyecto[]>(seedProyectos)

  function deleteProyecto(id: string) {
    setProyectos((current) => current.filter((proyecto) => proyecto.id !== id))
  }

  function publishNewVersion(id: string) {
    setProyectos((current) =>
      current.map((proyecto) => {
        if (proyecto.id !== id) return proyecto
        const newDeploy = buildDeploy(proyecto)
        return {
          ...proyecto,
          status: 'online',
          lastPublishedAt: new Date().toISOString(),
          deploys: [newDeploy, ...proyecto.deploys.map((deploy) => ({ ...deploy, isCurrent: false, status: 'offline' as const }))],
        }
      }),
    )
  }

  function rollbackDeploy(projectId: string, deployId: string) {
    setProyectos((current) =>
      current.map((proyecto) => {
        if (proyecto.id !== projectId) return proyecto
        return {
          ...proyecto,
          status: 'online',
          deploys: proyecto.deploys.map((deploy) => ({
            ...deploy,
            isCurrent: deploy.id === deployId,
            status: deploy.id === deployId ? 'online' : 'offline',
          })),
        }
      }),
    )
  }

  function toggleDeployStatus(projectId: string, deployId: string) {
    setProyectos((current) =>
      current.map((proyecto) => {
        if (proyecto.id !== projectId) return proyecto
        const deploys = proyecto.deploys.map((deploy) =>
          deploy.id === deployId ? { ...deploy, status: deploy.status === 'online' ? ('offline' as const) : ('online' as const) } : deploy,
        )
        const currentDeploy = deploys.find((deploy) => deploy.isCurrent)
        return {
          ...proyecto,
          status: currentDeploy?.status ?? proyecto.status,
          deploys,
        }
      }),
    )
  }

  function extendDeployTtl(projectId: string, deployId: string, days: 1 | 3 | 7 | 'reset') {
    setProyectos((current) =>
      current.map((proyecto) => {
        if (proyecto.id !== projectId) return proyecto
        return {
          ...proyecto,
          deploys: proyecto.deploys.map((deploy) => {
            if (deploy.id !== deployId) return deploy
            const hours = days === 'reset' ? proyecto.hoursRemaining : days * 24
            const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000)
            const ttlPercent = days === 'reset' ? 100 : Math.round((days / 7) * 100)
            return { ...deploy, expiresAtLabel: formatDateTime(expiresAt.toISOString()), ttlPercent }
          }),
        }
      }),
    )
  }

  return (
    <ProyectosContext.Provider
      value={{ proyectos, deleteProyecto, publishNewVersion, rollbackDeploy, toggleDeployStatus, extendDeployTtl }}
    >
      {children}
    </ProyectosContext.Provider>
  )
}

export function useProyectos() {
  const context = useContext(ProyectosContext)
  if (!context) throw new Error('useProyectos must be used within ProyectosProvider')
  return context
}
