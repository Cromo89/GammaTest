import { Clock } from 'lucide-react'
import { formatDateTime } from '@/shared/lib/utils'

const RESPONSE_SLA_HOURS = 48

export interface PendingTierRequest {
  tierLabel: string
  motivo: string
  submittedAt: string
}

export function TierRequestPending({ tierLabel, motivo, submittedAt }: PendingTierRequest) {
  const expectedResponseAt = new Date(new Date(submittedAt).getTime() + RESPONSE_SLA_HOURS * 60 * 60 * 1000).toISOString()

  return (
    <>
      <h2 className="mb-3 font-medium">Solicitar upgrade de tier</h2>

      <div className="flex items-center gap-2 rounded-lg border border-warning/30 bg-warning/5 px-3 py-2 text-sm">
        <Clock className="size-4 shrink-0 text-warning" />
        <span>
          Tu solicitud para pasar a <span className="font-medium capitalize">{tierLabel}</span> está en validación.
        </span>
      </div>

      <div className="mt-3 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground">
        <span className="text-xs font-mono uppercase">Motivo enviado</span>
        <p className="mt-1 text-foreground">"{motivo}"</p>
      </div>

      <div className="mt-3 flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
          <span className="text-muted-foreground">Solicitada el</span>
          <span className="font-medium">{formatDateTime(submittedAt)}</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
          <span className="text-muted-foreground">Respuesta estimada antes del</span>
          <span className="font-medium">{formatDateTime(expectedResponseAt)}</span>
        </div>
      </div>
    </>
  )
}
