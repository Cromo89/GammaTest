import { Check, ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui'
import { requestableTiers } from '@/data/tiers'
import type { Tier } from '@/data/user'

interface TierSelectProps {
  value: Tier
  onChange: (tier: Tier) => void
}

export function TierSelect({ value, onChange }: TierSelectProps) {
  const current = requestableTiers.find((option) => option.id === value) ?? requestableTiers[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex h-10 w-full items-center justify-between rounded-lg border border-border px-3 text-sm text-foreground capitalize hover:bg-muted"
        >
          <span>
            {current.label} — {current.limit}
          </span>
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
        <DropdownMenuLabel>Tier solicitado</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {requestableTiers.map((option) => (
          <DropdownMenuItem key={option.id} onSelect={() => onChange(option.id)} className="capitalize">
            <span className="flex-1">
              {option.label} — {option.limit}
            </span>
            {option.id === value && <Check className="size-4 shrink-0 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
