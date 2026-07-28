import { Play, Square, Terminal } from 'lucide-react'
import { Tooltip } from '@/shared/ui'
import type { Deploy } from '@/data/proyectos'
import { RollbackConfirmDialog } from './rollback-confirm-dialog'

interface DeployActionsProps {
  deploy: Deploy
  onToggleLogs: () => void
  onToggleStatus: (deployId: string) => void
  onRollback: (deployId: string) => void
}

export function DeployActions({ deploy, onToggleLogs, onToggleStatus, onRollback }: DeployActionsProps) {
  const isOnline = deploy.status === 'online'

  return (
    <div className="flex items-center justify-end gap-3">
      <Tooltip content="Ver el registro de compilación de este deploy">
        <button
          type="button"
          onClick={onToggleLogs}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <Terminal className="size-3" />
          Logs
        </button>
      </Tooltip>
      <Tooltip content={isOnline ? 'Detener este deploy y dejarlo fuera de línea' : 'Volver a poner este deploy en línea'}>
        <button
          type="button"
          onClick={() => onToggleStatus(deploy.id)}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          {isOnline ? <Square className="size-3" /> : <Play className="size-3" />}
          {isOnline ? 'Detener' : 'Reiniciar'}
        </button>
      </Tooltip>
      {!deploy.isCurrent && (
        <Tooltip content="Activar esta versión y detener la que está actualmente en línea">
          <span>
            <RollbackConfirmDialog version={deploy.version} onConfirm={() => onRollback(deploy.id)} />
          </span>
        </Tooltip>
      )}
    </div>
  )
}
