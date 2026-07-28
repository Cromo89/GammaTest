import { useState } from 'react'
import { Button, Textarea } from '@/shared/ui'
import { requestableTiers } from '@/data/tiers'
import type { Tier } from '@/data/user'
import { TierSelect } from './tier-select'

const MIN_MOTIVO_LENGTH = 10

interface TierRequestFormProps {
  onSubmit: (tierLabel: string, motivo: string) => void
}

export function TierRequestForm({ onSubmit }: TierRequestFormProps) {
  const [requestedTier, setRequestedTier] = useState<Tier>(requestableTiers[0].id)
  const [motivo, setMotivo] = useState('')

  function handleSubmit() {
    const target = requestableTiers.find((option) => option.id === requestedTier)
    if (!target) return
    onSubmit(target.label, motivo.trim())
  }

  return (
    <>
      <h2 className="mb-1 font-medium">Solicitar upgrade de tier</h2>
      <p className="mb-4 text-sm text-muted-foreground">Describe tu caso de uso. Un administrador revisará tu solicitud.</p>

      <label className="mb-2 block text-xs font-mono text-muted-foreground uppercase">Tier solicitado</label>
      <div className="mb-4">
        <TierSelect value={requestedTier} onChange={setRequestedTier} />
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

      <Button className="mt-4 w-full" disabled={motivo.length < MIN_MOTIVO_LENGTH} onClick={handleSubmit}>
        Enviar solicitud
      </Button>
    </>
  )
}
