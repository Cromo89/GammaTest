import type { Proyecto } from '@/data/proyectos'
import { navGroups, type NavItem } from './nav-config'

export interface NavResult {
  kind: 'nav'
  item: NavItem
}

export interface ProyectoResult {
  kind: 'proyecto'
  item: Proyecto
}

export type PaletteResult = NavResult | ProyectoResult

export function isNavResult(result: PaletteResult): result is NavResult {
  return result.kind === 'nav'
}

export function isProyectoResult(result: PaletteResult): result is ProyectoResult {
  return result.kind === 'proyecto'
}

const NAV_ITEMS = navGroups.flatMap((group) => group.items)

export function getPaletteResults(query: string, proyectos: Proyecto[]): PaletteResult[] {
  const q = query.trim().toLowerCase()

  const navResults = q ? NAV_ITEMS.filter((item) => item.label.toLowerCase().includes(q)) : NAV_ITEMS
  const proyectoResults = q
    ? proyectos.filter((proyecto) => proyecto.name.toLowerCase().includes(q) || proyecto.url.toLowerCase().includes(q))
    : []

  return [
    ...navResults.map((item): PaletteResult => ({ kind: 'nav', item })),
    ...proyectoResults.map((item): PaletteResult => ({ kind: 'proyecto', item })),
  ]
}
