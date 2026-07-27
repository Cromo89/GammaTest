import { useEffect, useState } from 'react'

const STORAGE_KEY = 'gamma-dashboard-theme'

export type DashboardTheme = 'dark' | 'light'

function readStoredTheme(): DashboardTheme {
  if (typeof window === 'undefined') return 'dark'
  return window.localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'
}

export function useDashboardTheme() {
  const [theme, setTheme] = useState<DashboardTheme>(readStoredTheme)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme)
    // Radix portals (dropdowns, dialogs, tooltips) render into document.body, fuera del
    // wrapper con data-theme del AppShell, así que el atributo debe sincronizarse a <html>
    // para que esos elementos también hereden el tema correcto.
    document.documentElement.dataset.theme = theme
    return () => {
      delete document.documentElement.dataset.theme
    }
  }, [theme])

  function toggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme }
}
