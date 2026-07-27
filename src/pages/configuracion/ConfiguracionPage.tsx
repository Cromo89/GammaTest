import { useState } from 'react'
import { useOutletContext } from 'react-router'
import { ChevronDown } from 'lucide-react'
import { Badge, Button, Card, Textarea } from '@/shared/ui'
import { tierInfo, requestableTiers } from '@/data/tiers'
import type { Tier } from '@/data/user'

const MIN_MOTIVO_LENGTH = 10

interface ShellContext {
  tier: string
}

export function ConfiguracionPage() {
  const { tier } = useOutletContext<ShellContext>()
  const currentTierInfo = tierInfo.find((option) => option.id === tier) ?? tierInfo[0]
  const [requestedTier, setRequestedTier] = useState<Tier>(requestableTiers[0].id)
  const [motivo, setMotivo] = useState('')

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <h1 className="font-heading text-2xl font-semibold">Configuración</h1>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-medium">Tu tier actual</h2>
          <Badge className="capitalize">{currentTierInfo.label}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{currentTierInfo.description}</p>
        <div className="mt-4 flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm">
          <span className="text-muted-foreground">Permanencia de deploys</span>
          <span className="font-medium capitalize">{currentTierInfo.limit}</span>
        </div>
      </Card>

      <Card>
        <h2 className="mb-1 font-medium">Solicitar upgrade de tier</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Describe tu caso de uso. Un administrador revisará tu solicitud.
        </p>

        <label className="mb-2 block text-xs font-mono text-muted-foreground uppercase">Tier solicitado</label>
        <div className="relative mb-4">
          <select
            value={requestedTier}
            onChange={(e) => setRequestedTier(e.target.value as Tier)}
            className="h-10 w-full appearance-none rounded-lg border border-border bg-transparent py-2 pr-9 pl-3 text-sm capitalize text-foreground focus:border-primary focus:outline-none"
          >
            {requestableTiers.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label} — {option.limit}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        <label className="mb-2 block text-xs font-mono text-muted-foreground uppercase">Motivo</label>
        <Textarea
          rows={3}
          placeholder="Describe tu caso de uso y por qué necesitas un tiempo de deploy más largo..."
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          {motivo.length}/{MIN_MOTIVO_LENGTH} caracteres mínimo
        </p>

        <Button className="mt-4 w-full" disabled={motivo.length < MIN_MOTIVO_LENGTH}>
          Enviar solicitud
        </Button>
      </Card>
    </div>
  )
}
