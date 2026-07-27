import type { Deploy } from '@/data/proyectos'
import { DeployItem } from './deploy-item'

export function DeployHistoryTable({ deploys }: { deploys: Deploy[] }) {
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
              <DeployItem key={deploy.id} deploy={deploy} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
