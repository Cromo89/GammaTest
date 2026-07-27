import { RotateCcw } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import type { Deploy } from '@/data/proyectos'

export function DeployItem({ deploy }: { deploy: Deploy }) {
  const isOnline = deploy.status === 'online'

  return (
    <tr className={cn('border-b border-border text-sm last:border-0', deploy.isCurrent && 'bg-primary/5')}>
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
        {!deploy.isCurrent && (
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="size-3" />
            Rollback
          </button>
        )}
      </td>
    </tr>
  )
}
