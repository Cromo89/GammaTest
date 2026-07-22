import type { ComponentType } from 'react'
import { LayoutGrid, Settings } from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  icon: ComponentType<{ className?: string }>
}

export const navItems: NavItem[] = [
  { label: 'Proyectos', href: '/proyectos', icon: LayoutGrid },
  { label: 'Configuración', href: '/configuracion', icon: Settings },
]
