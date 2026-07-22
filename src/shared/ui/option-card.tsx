import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/shared/lib/utils'

interface OptionCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  subtitle: string
  selected?: boolean
  layout?: 'stacked' | 'inline'
}

export function OptionCard({
  title,
  subtitle,
  selected,
  layout = 'stacked',
  className,
  disabled,
  ...props
}: OptionCardProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        'flex items-center justify-center gap-1 rounded-lg border font-mono text-sm capitalize transition-colors',
        layout === 'inline' ? 'flex-1 px-4 py-2' : 'flex-1 flex-col px-4 py-3',
        selected
          ? 'border-primary bg-primary/5 text-foreground'
          : 'border-border text-muted-foreground',
        disabled && 'opacity-50',
        !disabled && !selected && 'hover:border-primary/50',
        className,
      )}
      {...props}
    >
      <span className={selected ? 'text-foreground' : ''}>{title}</span>
      {layout === 'inline' && <span className="text-muted-foreground">—</span>}
      <span className={cn(layout === 'stacked' && 'text-xs', selected ? 'text-primary' : 'text-muted-foreground')}>
        {subtitle}
      </span>
    </button>
  )
}
