import { useState } from 'react'
import { useOutletContext } from 'react-router'
import { Badge, Button, Card, OptionCard, Textarea } from '@/shared/ui'
import { tierInfo, requestableTiers } from '@/data/tiers'
import type { Tier } from '@/data/user'

const MIN_MOTIVO_LENGTH = 10

interface ShellContext {
  tier: string
  onTierChange: (tier: string) => void
}

export function ConfiguracionPage() {
  const { tier, onTierChange } = useOutletContext<ShellContext>()
  const pendingRequestOptions = tierInfo.filter((option) => option.id !== tier)
  const [requestedTier, setRequestedTier] = useState<Tier>(requestableTiers[0].id)
  const [motivo, setMotivo] = useState('')
  const selectedRequestTier = pendingRequestOptions.some((option) => option.id === requestedTier)
    ? requestedTier
    : pendingRequestOptions[0]?.id

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <h1 className="font-heading text-2xl font-semibold">Configuración</h1>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-medium">Tu tier</h2>
          <Badge className="capitalize">{tier}</Badge>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          Default tier. Deployments live 7 days by default, then stop.
        </p>
        <div className="flex gap-3">
          {tierInfo.map((option) => (
            <OptionCard
              key={option.id}
              title={option.label}
              subtitle={option.limit}
              selected={option.id === tier}
              onClick={() => onTierChange(option.id)}
            />
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="mb-1 font-medium">Solicitar upgrade de tier</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Describe tu caso de uso. Un administrador revisará tu solicitud.
        </p>

        <label className="mb-2 block text-xs font-mono text-muted-foreground uppercase">Tier solicitado</label>
        <div className="mb-4 flex gap-3">
          {pendingRequestOptions.map((option) => (
            <OptionCard
              key={option.id}
              layout="inline"
              title={option.label}
              subtitle={option.limit}
              selected={option.id === selectedRequestTier}
              onClick={() => setRequestedTier(option.id)}
            />
          ))}
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
