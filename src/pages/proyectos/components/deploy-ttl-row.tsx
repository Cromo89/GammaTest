import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'
import { Tooltip } from '@/shared/ui'
import type { Deploy } from '@/data/proyectos'

const TTL_OPTIONS = [1, 3, 7] as const

function TtlButton({ onClick, tooltip, children }: { onClick: () => void; tooltip: string; children: ReactNode }) {
  return (
    <Tooltip content={tooltip}>
      <button
        type="button"
        onClick={onClick}
        className="rounded-md border border-border px-1.5 py-0.5 text-[11px] text-muted-foreground hover:border-primary hover:text-foreground"
      >
        {children}
      </button>
    </Tooltip>
  )
}

interface DeployTtlRowProps {
  deploy: Deploy
  showLogs: boolean
  onExtendTtl: (deployId: string, days: 1 | 3 | 7 | 'reset') => void
}

export function DeployTtlRow({ deploy, showLogs, onExtendTtl }: DeployTtlRowProps) {
  return (
    <tr className={cn('border-b border-border text-sm last:border-0', showLogs && 'border-b-0')}>
      <td colSpan={4} className="px-4 pt-4 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <Tooltip content="Time To Live: cuánto tiempo seguirá en línea este deploy antes de expirar automáticamente">
            <span className="cursor-help font-mono text-muted-foreground uppercase">TTL</span>
          </Tooltip>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-muted-foreground">Expira {deploy.expiresAtLabel}</span>
            <div className="flex gap-1">
              {TTL_OPTIONS.map((days) => (
                <TtlButton
                  key={days}
                  onClick={() => onExtendTtl(deploy.id, days)}
                  tooltip={`Extender el tiempo de vida de este deploy a ${days} día${days === 1 ? '' : 's'}`}
                >
                  {days}d
                </TtlButton>
              ))}
              <TtlButton
                onClick={() => onExtendTtl(deploy.id, 'reset')}
                tooltip="Restablecer el tiempo de vida al valor original del proyecto"
              >
                Reset
              </TtlButton>
            </div>
          </div>
        </div>
        <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn('h-full rounded-full', deploy.ttlPercent <= 20 ? 'bg-warning' : 'bg-primary')}
            style={{ width: `${deploy.ttlPercent}%` }}
          />
        </div>
      </td>
    </tr>
  )
}
