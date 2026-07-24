import { useEffect, useState } from 'react'

const STORAGE_KEY = 'gamma-landing-theme'

export type LandingTheme = 'dark' | 'light'

function readStoredTheme(): LandingTheme {
  if (typeof window === 'undefined') return 'dark'
  return window.localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'
}

export function useLandingTheme() {
  const [theme, setTheme] = useState<LandingTheme>(readStoredTheme)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  function toggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme }
}
