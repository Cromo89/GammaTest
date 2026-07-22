export type ProjectStatus = 'online' | 'offline'
export type ProjectType = 'HTML' | 'Next.js'

export interface Deploy {
  id: string
  hash: string
  status: ProjectStatus
  isCurrent: boolean
  type: ProjectType
  version: string
  relativeLabel: string
  expiresAtLabel: string
  ttlPercent: number
}

export interface Proyecto {
  id: string
  name: string
  type: ProjectType
  status: ProjectStatus
  url: string
  lastPublishedAt: string
  hoursRemaining: number
  deploys: Deploy[]
}

export const proyectos: Proyecto[] = [
  {
    id: 'b74a0698',
    name: 'Proyecto de prueba mock-frontend',
    type: 'HTML',
    status: 'online',
    url: 'proyecto-de-prueba-mock-frontend.gamma.pulsar.codes',
    lastPublishedAt: '2026-07-21T12:08:18',
    hoursRemaining: 168,
    deploys: [
      {
        id: 'd1',
        hash: 'e1052f0e',
        status: 'online',
        isCurrent: true,
        type: 'HTML',
        version: 'v1',
        relativeLabel: 'ahora mismo',
        expiresAtLabel: '28/7/2026, 12:08:18 p.m.',
        ttlPercent: 100,
      },
    ],
  },
]
