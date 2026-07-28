import { useState } from 'react'
import { Card } from '@/shared/ui'
import { TierRequestForm } from './tier-request-form'
import { TierRequestPending, type PendingTierRequest } from './tier-request-pending'

interface TierRequestCardProps {
  onSubmit: (tierLabel: string) => void
}

export function TierRequestCard({ onSubmit }: TierRequestCardProps) {
  const [pendingRequest, setPendingRequest] = useState<PendingTierRequest | null>(null)

  function handleSubmit(tierLabel: string, motivo: string) {
    setPendingRequest({ tierLabel, motivo, submittedAt: new Date().toISOString() })
    onSubmit(tierLabel)
  }

  return <Card>{pendingRequest ? <TierRequestPending {...pendingRequest} /> : <TierRequestForm onSubmit={handleSubmit} />}</Card>
}
