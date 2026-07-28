import { Check, ChevronDown, Globe } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import { LANGUAGES } from './topbar-data'

interface LanguageMenuProps {
  value: string
  onChange: (code: string) => void
  variant?: 'compact' | 'block'
}

export function LanguageMenu({ value, onChange, variant = 'compact' }: LanguageMenuProps) {
  const current = LANGUAGES.find((language) => language.code === value) ?? LANGUAGES[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Cambiar idioma"
          className={cn(
            'flex items-center gap-2 rounded-lg border border-border text-sm text-foreground transition-colors hover:bg-muted',
            variant === 'compact' ? 'h-9 px-2.5' : 'h-10 w-full justify-between px-3',
          )}
        >
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true">{current.flag}</span>
            {variant === 'compact' ? (
              <span className="hidden sm:inline">{current.code.split('-')[0].toUpperCase()}</span>
            ) : (
              <span>{current.label}</span>
            )}
          </span>
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={variant === 'block' ? 'start' : 'end'} className="min-w-56">
        <DropdownMenuLabel>
          <span className="flex items-center gap-1.5">
            <Globe className="size-3.5" />
            Idioma
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {LANGUAGES.map((language) => (
          <DropdownMenuItem key={language.code} onSelect={() => onChange(language.code)}>
            <span aria-hidden="true">{language.flag}</span>
            <span className="flex-1">{language.label}</span>
            {language.code === value && <Check className="size-4 shrink-0 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
