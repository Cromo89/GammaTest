import type { Deploy } from '@/data/proyectos'
import { DeployItem } from './deploy-item'

interface DeployHistoryTableProps {
  deploys: Deploy[]
  onRollback: (deployId: string) => void
  onToggleStatus: (deployId: string) => void
  onExtendTtl: (deployId: string, days: 1 | 3 | 7 | 'reset') => void
}

export function DeployHistoryTable({ deploys, onRollback, onToggleStatus, onExtendTtl }: DeployHistoryTableProps) {
  return (
    <div>
      <p className="mb-2 text-xs font-mono text-muted-foreground uppercase">Historial de deploys</p>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="px-4 py-2 font-medium">Fecha</th>
              <th className="px-4 py-2 font-medium">Versión</th>
              <th className="px-4 py-2 font-medium">Estado</th>
              <th className="px-4 py-2 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {deploys.map((deploy) => (
              <DeployItem
                key={deploy.id}
                deploy={deploy}
                onRollback={onRollback}
                onToggleStatus={onToggleStatus}
                onExtendTtl={onExtendTtl}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
