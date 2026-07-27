import { Link } from 'react-router'
import { Plus } from 'lucide-react'

export function NewProjectCard() {
  return (
    <Link
      to="/proyectos/nuevo"
      className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border p-6 text-center transition-colors hover:border-primary"
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Plus className="size-4" />
      </span>
      <div>
        <p className="text-sm font-medium">Publica una nueva experiencia</p>
        <p className="text-xs text-muted-foreground">HTML, React/Vite o Next.js</p>
      </div>
    </Link>
  )
}
