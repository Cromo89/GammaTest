import type { Tier } from './user'

export interface TierInfo {
  id: Tier
  label: string
  limit: string
}

export const tierInfo: TierInfo[] = [
  { id: 'alpha', label: 'alpha', limit: 'hasta 7 días' },
  { id: 'beta', label: 'beta', limit: 'hasta 30 días' },
  { id: 'gamma', label: 'gamma', limit: 'ilimitado' },
]

export const requestableTiers: TierInfo[] = [
  { id: 'beta', label: 'beta', limit: 'hasta 30 días' },
  { id: 'gamma', label: 'gamma', limit: 'ilimitado' },
]
