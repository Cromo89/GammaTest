import type { ComponentType } from 'react'
import { BookOpen, LayoutGrid, Settings } from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  icon: ComponentType<{ className?: string }>
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    label: 'Workspace',
    items: [{ label: 'Proyectos', href: '/proyectos', icon: LayoutGrid }],
  },
  {
    label: 'Administración',
    items: [
      { label: 'Configuración', href: '/configuracion', icon: Settings },
      { label: 'Documentación', href: '/documentacion', icon: BookOpen },
    ],
  },
]
