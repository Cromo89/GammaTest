import { useEffect, useState } from 'react'
import { useProyectos } from '@/features/proyectos/use-proyectos'
import type { Proyecto } from '@/data/proyectos'

export function useDeployActions(proyecto: Proyecto | undefined) {
  const { publishNewVersion, rollbackDeploy, toggleDeployStatus, extendDeployTtl } = useProyectos()
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const timeout = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(timeout)
  }, [toast])

  function handlePublish() {
    if (!proyecto) return
    publishNewVersion(proyecto.id)
    setToast('Nueva versión publicada correctamente.')
  }

  function handleRollback(deployId: string) {
    if (!proyecto) return
    const target = proyecto.deploys.find((deploy) => deploy.id === deployId)
    rollbackDeploy(proyecto.id, deployId)
    setToast(`Se hizo rollback a la versión ${target?.version ?? ''}.`)
  }

  function handleToggleStatus(deployId: string) {
    if (!proyecto) return
    const target = proyecto.deploys.find((deploy) => deploy.id === deployId)
    toggleDeployStatus(proyecto.id, deployId)
    setToast(
      target?.status === 'online' ? `Se detuvo la versión ${target.version}.` : `Se reinició la versión ${target?.version ?? ''}.`,
    )
  }

  function handleExtendTtl(deployId: string, days: 1 | 3 | 7 | 'reset') {
    if (!proyecto) return
    const target = proyecto.deploys.find((deploy) => deploy.id === deployId)
    extendDeployTtl(proyecto.id, deployId, days)
    setToast(
      days === 'reset'
        ? `Se restableció el TTL de la versión ${target?.version ?? ''}.`
        : `Se extendió el TTL de la versión ${target?.version ?? ''} a ${days} día${days === 1 ? '' : 's'}.`,
    )
  }

  return { toast, handlePublish, handleRollback, handleToggleStatus, handleExtendTtl }
}
