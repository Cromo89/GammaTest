import { es } from './locales/es'

type Dictionary = typeof es
type TranslationKey = keyof Dictionary

const dictionaries: Record<'es', Dictionary> = { es }
const locale: keyof typeof dictionaries = 'es'

export function t(key: TranslationKey): string {
  return dictionaries[locale][key]
}

export function useTranslation() {
  return { t }
}
