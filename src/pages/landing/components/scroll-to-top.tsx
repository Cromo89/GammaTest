import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 400)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <a
      href="#"
      aria-label="Volver al inicio"
      className={cn(
        'fixed right-6 bottom-6 z-10 flex size-11 items-center justify-center rounded-full border border-brand-teal/40 bg-background/80 text-brand-teal backdrop-blur-sm transition-all duration-300 hover:border-brand-teal hover:bg-brand-teal/10',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <ArrowUp className="animate-arrow-bounce size-5" />
    </a>
  )
}
