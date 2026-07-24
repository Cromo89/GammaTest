import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  style?: CSSProperties
  intensity?: 'default' | 'subtle'
  blur?: boolean
}

export function Reveal({ children, className, delay = 0, style, intensity = 'default', blur = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ ...style, transitionDelay: `${delay}ms` }}
      className={cn(
        'ease-out',
        intensity === 'subtle' ? 'transition-all duration-1000' : 'transition-all duration-700',
        visible
          ? 'translate-y-0 opacity-100 blur-none'
          : intensity === 'subtle'
            ? 'translate-y-2 opacity-0'
            : 'translate-y-6 opacity-0',
        !visible && blur && 'blur-[8px]',
        className,
      )}
    >
      {children}
    </div>
  )
}
