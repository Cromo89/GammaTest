import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Search } from 'lucide-react'
import { useProyectos } from '@/features/proyectos/use-proyectos'
import { getPaletteResults, isNavResult, isProyectoResult, type PaletteResult } from './command-palette-results'
import { CommandPaletteContent } from './command-palette-content'

export function CommandPalette() {
  const navigate = useNavigate()
  const { proyectos } = useProyectos()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = getPaletteResults(query, proyectos)
  const navResults = results.filter(isNavResult)
  const proyectoResults = results.filter(isProyectoResult)

  useEffect(() => setActiveIndex(0), [query])

  useEffect(() => {
    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (!nextOpen) setQuery('')
  }

  function handleSelect(result: PaletteResult) {
    handleOpenChange(false)
    navigate(result.kind === 'nav' ? result.item.href : `/proyectos/${result.item.id}`)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (results.length === 0) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => (index + 1) % results.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => (index - 1 + results.length) % results.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      handleSelect(results[activeIndex])
    }
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          className="flex h-9 w-full max-w-md items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 text-left hover:border-primary/50"
        >
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
            Buscar proyectos, dominios o publicaciones...
          </span>
          <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
            ⌘K
          </kbd>
        </button>
      </DialogPrimitive.Trigger>
      <CommandPaletteContent
        inputRef={inputRef}
        query={query}
        onQueryChange={setQuery}
        onKeyDown={handleKeyDown}
        results={results}
        navResults={navResults}
        proyectoResults={proyectoResults}
        activeIndex={activeIndex}
        onSelect={handleSelect}
      />
    </DialogPrimitive.Root>
  )
}
