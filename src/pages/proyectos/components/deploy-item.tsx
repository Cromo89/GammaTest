import { useState } from 'react'
import { cn } from '@/shared/lib/utils'
import type { Deploy } from '@/data/proyectos'
import { DeployActions } from './deploy-actions'
import { DeployTtlRow } from './deploy-ttl-row'

interface DeployItemProps {
  deploy: Deploy
  onRollback: (deployId: string) => void
  onToggleStatus: (deployId: string) => void
  onExtendTtl: (deployId: string, days: 1 | 3 | 7 | 'reset') => void
}

export function DeployItem({ deploy, onRollback, onToggleStatus, onExtendTtl }: DeployItemProps) {
  const [showLogs, setShowLogs] = useState(false)
  const isOnline = deploy.status === 'online'

  return (
    <>
      <tr className={cn('text-sm', deploy.isCurrent && 'bg-primary/5')}>
        <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{deploy.relativeLabel}</td>
        <td className="px-4 py-3 font-mono text-xs">{deploy.version}</td>
        <td className="px-4 py-3">
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <span className={cn('size-1.5 shrink-0 rounded-full', isOnline ? 'bg-success' : 'bg-muted-foreground')} />
            {isOnline ? 'En línea' : 'Detenido'}
            {deploy.isCurrent && (
              <span className="ml-1 rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
                Actual
              </span>
            )}
          </span>
        </td>
        <td className="px-4 py-3 text-right">
          <DeployActions
            deploy={deploy}
            onToggleLogs={() => setShowLogs((value) => !value)}
            onToggleStatus={onToggleStatus}
            onRollback={onRollback}
          />
        </td>
      </tr>
      <DeployTtlRow deploy={deploy} showLogs={showLogs} onExtendTtl={onExtendTtl} />
      {showLogs && (
        <tr className="border-b border-border text-sm last:border-0">
          <td colSpan={4} className="px-4 pb-3">
            <div className="rounded-lg bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">
              Los logs de build ya no están disponibles para este deploy.
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
