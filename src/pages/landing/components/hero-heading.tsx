import { useEffect, useState } from 'react'
import { cn } from '@/shared/lib/utils'

interface Word {
  text: string
  gradient?: boolean
}

const WORDS: Word[] = [
  { text: 'De' },
  { text: 'una' },
  { text: 'idea' },
  { text: 'con' },
  { text: 'IA' },
  { text: 'a' },
  { text: 'una' },
  { text: 'experiencia compartida.', gradient: true },
]

export function HeroHeading() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setMounted(true)
      return
    }
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <h1 className="mx-auto mt-6 max-w-4xl font-heading text-6xl leading-[0.95] font-semibold tracking-tight sm:text-7xl">
      {WORDS.map((word, index) => (
        <span key={word.text + index} className="inline-block overflow-hidden pb-1">
          <span
            style={{ transitionDelay: `${index * 55}ms` }}
            className={cn(
              'mr-[0.28em] inline-block transition-all duration-500 ease-out',
              word.gradient && 'bg-gradient-to-r from-brand-teal via-brand-cyan to-brand-blue bg-clip-text text-transparent',
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
            )}
          >
            {word.text}
          </span>
        </span>
      ))}
    </h1>
  )
}
