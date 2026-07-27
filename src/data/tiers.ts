import type { Tier } from './user'

export interface TierInfo {
  id: Tier
  label: string
  limit: string
  description: string
}

export const tierInfo: TierInfo[] = [
  {
    id: 'alpha',
    label: 'alpha',
    limit: 'hasta 7 días',
    description: 'Ideas tempranas, pruebas rápidas y validaciones internas.',
  },
  {
    id: 'beta',
    label: 'beta',
    limit: 'hasta 30 días',
    description: 'Pruebas con usuarios y experiencias en evolución.',
  },
  {
    id: 'gamma',
    label: 'gamma',
    limit: 'ilimitado',
    description: 'Soluciones validadas que generan valor continuo.',
  },
]

export const requestableTiers: TierInfo[] = tierInfo.filter((option) => option.id !== 'alpha')
