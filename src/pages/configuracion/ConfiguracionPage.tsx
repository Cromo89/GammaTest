import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router'
import { Badge, Card } from '@/shared/ui'
import { tierInfo } from '@/data/tiers'
import { TierRequestCard } from './components/tier-request-card'
import { RequestToast } from './components/request-toast'

interface ShellContext {
  tier: string
}

export function ConfiguracionPage() {
  const { tier } = useOutletContext<ShellContext>()
  const currentTierInfo = tierInfo.find((option) => option.id === tier) ?? tierInfo[0]
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const timeout = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(timeout)
  }, [toast])

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <h1 className="font-heading text-2xl font-semibold">Configuración</h1>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-medium">Tu tier actual</h2>
          <Badge variant="success" className="capitalize">
            {currentTierInfo.label}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{currentTierInfo.description}</p>
        <div className="mt-4 flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm">
          <span className="text-muted-foreground">Permanencia de deploys</span>
          <span className="font-medium capitalize">{currentTierInfo.limit}</span>
        </div>
      </Card>

      <TierRequestCard onSubmit={() => setToast('Solicitud enviada correctamente.')} />

      {toast && <RequestToast message={toast} />}
    </div>
  )
}
