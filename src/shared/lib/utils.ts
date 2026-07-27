import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(value: string) {
  const withoutDiacritics = value
    .toLowerCase()
    .normalize('NFD')
    .split('')
    .filter((char) => char.charCodeAt(0) < 0x0300 || char.charCodeAt(0) > 0x036f)
    .join('')

  return withoutDiacritics.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function getFirstName(email: string) {
  const [local] = email.split('@')
  const [first] = local.split(/[._-]/)
  return first ? first.charAt(0).toUpperCase() + first.slice(1) : ''
}

export function getFullName(email: string) {
  const [local] = email.split('@')
  return local
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function formatDateTime(isoDate: string) {
  return new Date(isoDate).toLocaleString('es-CL', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}
