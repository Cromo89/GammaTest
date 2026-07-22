export type Tier = 'alpha' | 'beta' | 'gamma'

export interface User {
  email: string
  tier: Tier
}

export const currentUser: User = {
  email: 'claudio.romo@cencosud.cl',
  tier: 'alpha',
}
