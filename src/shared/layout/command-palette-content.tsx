import type { KeyboardEvent, RefObject } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Search } from 'lucide-react'
import type { NavResult, PaletteResult, ProyectoResult } from './command-palette-results'
import { CommandPaletteItem } from './command-palette-item'

interface CommandPaletteContentProps {
  inputRef: RefObject<HTMLInputElement | null>
  query: string
  onQueryChange: (value: string) => void
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
  results: PaletteResult[]
  navResults: NavResult[]
  proyectoResults: ProyectoResult[]
  activeIndex: number
  onSelect: (result: PaletteResult) => void
}

export function CommandPaletteContent({
  inputRef,
  query,
  onQueryChange,
  onKeyDown,
  results,
  navResults,
  proyectoResults,
  activeIndex,
  onSelect,
}: CommandPaletteContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60" />
      <DialogPrimitive.Content
        onOpenAutoFocus={(event) => {
          event.preventDefault()
          inputRef.current?.focus()
        }}
        className="fixed top-24 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-background shadow-[var(--shadow-modal)]"
      >
        <DialogPrimitive.Title className="sr-only">Buscar</DialogPrimitive.Title>
        <DialogPrimitive.Description className="sr-only">
          Busca proyectos o salta a una sección del portal
        </DialogPrimitive.Description>

        <div className="flex items-center gap-2 border-b border-border px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Buscar proyectos, dominios o publicaciones..."
            className="h-12 min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {navResults.length > 0 && (
            <div className="mb-1">
              <p className="px-2.5 py-1.5 font-mono text-xs text-muted-foreground uppercase">Navegación</p>
              {navResults.map((result) => (
                <CommandPaletteItem
                  key={result.item.href}
                  result={result}
                  isActive={results.indexOf(result) === activeIndex}
                  onSelect={() => onSelect(result)}
                />
              ))}
            </div>
          )}
          {proyectoResults.length > 0 && (
            <div>
              <p className="px-2.5 py-1.5 font-mono text-xs text-muted-foreground uppercase">Proyectos</p>
              {proyectoResults.map((result) => (
                <CommandPaletteItem
                  key={result.item.id}
                  result={result}
                  isActive={results.indexOf(result) === activeIndex}
                  onSelect={() => onSelect(result)}
                />
              ))}
            </div>
          )}
          {results.length === 0 && (
            <p className="px-2.5 py-6 text-center text-sm text-muted-foreground">Ningún proyecto coincide con "{query}"</p>
          )}
        </div>

        <div className="flex items-center gap-3 border-t border-border px-4 py-2 text-xs text-muted-foreground">
          <span>↑↓ Navegar</span>
          <span>↵ Seleccionar</span>
          <span>Esc Cerrar</span>
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
