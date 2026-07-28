import { FileCode2 } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import type { PaletteResult } from './command-palette-results'

interface CommandPaletteItemProps {
  result: PaletteResult
  isActive: boolean
  onSelect: () => void
}

export function CommandPaletteItem({ result, isActive, onSelect }: CommandPaletteItemProps) {
  const Icon = result.kind === 'nav' ? result.item.icon : FileCode2
  const label = result.kind === 'nav' ? result.item.label : result.item.name

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm',
        isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span className="truncate">{label}</span>
      {result.kind === 'proyecto' && (
        <span className="ml-auto shrink-0 text-xs text-muted-foreground/70">{result.item.type}</span>
      )}
    </button>
  )
}
