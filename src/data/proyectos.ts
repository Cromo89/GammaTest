export type ProjectStatus = 'online' | 'offline'
export type ProjectType = 'HTML' | 'React/Vite' | 'Next.js'

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
  owner: string
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
    owner: 'Claudio Romo',
    lastPublishedAt: '2026-07-21T12:08:18',
    hoursRemaining: 168,
    deploys: [
      { id: 'd1', hash: 'e1052f0e', status: 'online', isCurrent: true, type: 'HTML', version: 'v1', relativeLabel: 'ahora mismo', expiresAtLabel: '28/7/2026, 12:08:18 p.m.', ttlPercent: 100 },
    ],
  },
  {
    id: 'c1a2b3d4',
    name: 'Dashboard de métricas SSC',
    type: 'Next.js',
    status: 'online',
    url: 'dashboard-metricas-ssc.gamma.pulsar.codes',
    owner: 'David Andrés',
    lastPublishedAt: '2026-07-25T09:14:00',
    hoursRemaining: 720,
    deploys: [
      { id: 'd1', hash: 'a1b2c3d4', status: 'online', isCurrent: true, type: 'Next.js', version: 'v3', relativeLabel: 'hace 2 días', expiresAtLabel: '24/8/2026, 09:14:00 a.m.', ttlPercent: 85 },
    ],
  },
  {
    id: 'e5f6a7b8',
    name: 'Landing campaña Fiestas Patrias',
    type: 'HTML',
    status: 'online',
    url: 'landing-fiestas-patrias.gamma.pulsar.codes',
    owner: 'María José Fuentes',
    lastPublishedAt: '2026-07-26T15:30:00',
    hoursRemaining: 24,
    deploys: [
      { id: 'd1', hash: 'b2c3d4e5', status: 'online', isCurrent: true, type: 'HTML', version: 'v1', relativeLabel: 'hace 1 día', expiresAtLabel: '27/7/2026, 15:30:00 p.m.', ttlPercent: 15 },
    ],
  },
  {
    id: 'c9d0e1f2',
    name: 'Prototipo checkout unificado',
    type: 'HTML',
    status: 'offline',
    url: 'prototipo-checkout-unificado.gamma.pulsar.codes',
    owner: 'Claudio Romo',
    lastPublishedAt: '2026-07-10T11:00:00',
    hoursRemaining: 0,
    deploys: [
      { id: 'd1', hash: 'c3d4e5f6', status: 'offline', isCurrent: true, type: 'HTML', version: 'v2', relativeLabel: 'hace 17 días', expiresAtLabel: '17/7/2026, 11:00:00 a.m.', ttlPercent: 0 },
    ],
  },
  {
    id: 'a3b4c5d6',
    name: 'Portal proveedores',
    type: 'Next.js',
    status: 'online',
    url: 'portal-proveedores.gamma.pulsar.codes',
    owner: 'Ignacio Silva',
    lastPublishedAt: '2026-07-23T08:45:00',
    hoursRemaining: 504,
    deploys: [
      { id: 'd1', hash: 'd4e5f6a7', status: 'online', isCurrent: true, type: 'Next.js', version: 'v5', relativeLabel: 'hace 4 días', expiresAtLabel: '20/8/2026, 08:45:00 a.m.', ttlPercent: 65 },
    ],
  },
  {
    id: 'f7a8b9c0',
    name: 'Design tokens explorer',
    type: 'HTML',
    status: 'offline',
    url: 'design-tokens-explorer.gamma.pulsar.codes',
    owner: 'David Andrés',
    lastPublishedAt: '2026-06-30T16:20:00',
    hoursRemaining: 0,
    deploys: [
      { id: 'd1', hash: 'e5f6a7b8', status: 'offline', isCurrent: true, type: 'HTML', version: 'v1', relativeLabel: 'hace 27 días', expiresAtLabel: '7/7/2026, 16:20:00 p.m.', ttlPercent: 0 },
    ],
  },
  {
    id: 'd8e9f0a1',
    name: 'Encuesta de clima laboral',
    type: 'HTML',
    status: 'online',
    url: 'encuesta-clima-laboral.gamma.pulsar.codes',
    owner: 'María José Fuentes',
    lastPublishedAt: '2026-07-24T10:05:00',
    hoursRemaining: 336,
    deploys: [
      { id: 'd1', hash: 'f6a7b8c9', status: 'online', isCurrent: true, type: 'HTML', version: 'v2', relativeLabel: 'hace 3 días', expiresAtLabel: '7/8/2026, 10:05:00 a.m.', ttlPercent: 55 },
    ],
  },
  {
    id: 'b2c3d4e5',
    name: 'Simulador de precios promocionales',
    type: 'Next.js',
    status: 'online',
    url: 'simulador-precios-promocionales.gamma.pulsar.codes',
    owner: 'Ignacio Silva',
    lastPublishedAt: '2026-07-22T14:40:00',
    hoursRemaining: 168,
    deploys: [
      { id: 'd1', hash: 'a7b8c9d0', status: 'online', isCurrent: true, type: 'Next.js', version: 'v4', relativeLabel: 'hace 5 días', expiresAtLabel: '29/7/2026, 14:40:00 p.m.', ttlPercent: 30 },
    ],
  },
  {
    id: 'c3d4e5f6',
    name: 'Panel de configuración interno',
    type: 'React/Vite',
    status: 'online',
    url: 'panel-configuracion-interno.gamma.pulsar.codes',
    owner: 'Claudio Romo',
    lastPublishedAt: '2026-07-26T10:15:00',
    hoursRemaining: 168,
    deploys: [
      { id: 'd1', hash: 'b8c9d0e1', status: 'online', isCurrent: true, type: 'React/Vite', version: 'v1', relativeLabel: 'hace 1 día', expiresAtLabel: '2/8/2026, 10:15:00 a.m.', ttlPercent: 88 },
    ],
  },
  {
    id: 'd4e5f6a7',
    name: 'Explorador de componentes UI',
    type: 'React/Vite',
    status: 'online',
    url: 'explorador-componentes-ui.gamma.pulsar.codes',
    owner: 'David Andrés',
    lastPublishedAt: '2026-07-20T16:50:00',
    hoursRemaining: 720,
    deploys: [
      { id: 'd1', hash: 'c9d0e1f2', status: 'online', isCurrent: true, type: 'React/Vite', version: 'v2', relativeLabel: 'hace 7 días', expiresAtLabel: '19/8/2026, 16:50:00 p.m.', ttlPercent: 78 },
    ],
  },
]
