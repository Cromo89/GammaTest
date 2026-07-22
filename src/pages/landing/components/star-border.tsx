import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'

interface StarBorderProps {
  children: ReactNode
  className?: string
}

export function StarBorder({ children, className }: StarBorderProps) {
  return (
    <div className={cn('relative isolate rounded-3xl border border-border', className)}>
      <span
        aria-hidden="true"
        className="star-border-ring animate-star-border-move pointer-events-none absolute inset-0 rounded-3xl"
      />
      {children}
    </div>
  )
}
