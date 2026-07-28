export interface Notification {
  id: string
  title: string
  description: string
  relativeLabel: string
}

export const NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Nueva publicación en línea',
    description: '"IA SDLC hack" se publicó correctamente.',
    relativeLabel: 'Hace 2 h',
  },
  {
    id: 'n2',
    title: 'Nivel Alpha por vencer',
    description: 'Tu proyecto expira en 3 días. Renuévalo para no perder la URL.',
    relativeLabel: 'Ayer',
  },
  {
    id: 'n3',
    title: 'Colaborador agregado',
    description: 'David Andrés se unió a "Cencommit".',
    relativeLabel: 'Hace 3 días',
  },
]

export interface Language {
  code: string
  label: string
  flag: string
}

export const LANGUAGES: Language[] = [
  { code: 'es', label: 'Español', flag: '🇨🇱' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
]

export function getInitials(email: string) {
  const [local] = email.split('@')
  const initials = local
    .split(/[._-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
  return initials.join('') || '?'
}
