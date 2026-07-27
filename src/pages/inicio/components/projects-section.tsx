import { useState, type ReactNode } from 'react'
import { LayoutGrid, List, type LucideIcon } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import type { Proyecto, ProjectType } from '@/data/proyectos'
import { ProjectCard } from '../../proyectos/components/project-card'
import { ProjectsTable } from './projects-table'

const TYPES: ProjectType[] = ['HTML', 'React/Vite', 'Next.js']

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
        active ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}

interface ViewButtonProps {
  active: boolean
  onClick: () => void
  icon: LucideIcon
  label: string
}

function ViewButton({ active, onClick, icon: Icon, label }: ViewButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'flex size-7 items-center justify-center rounded-md transition-colors',
        active ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground',
      )}
    >
      <Icon className="size-4" />
    </button>
  )
}

interface ProjectsSectionProps {
  proyectos: Proyecto[]
  emptyMessage: string
}

export function ProjectsSection({ proyectos, emptyMessage }: ProjectsSectionProps) {
  const [view, setView] = useState<'grid' | 'table'>('grid')
  const [typeFilter, setTypeFilter] = useState<ProjectType | 'all'>('all')
  const filtered = typeFilter === 'all' ? proyectos : proyectos.filter((proyecto) => proyecto.type === typeFilter)

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1">
          <FilterButton active={typeFilter === 'all'} onClick={() => setTypeFilter('all')}>
            Todos
          </FilterButton>
          {TYPES.map((type) => (
            <FilterButton key={type} active={typeFilter === type} onClick={() => setTypeFilter(type)}>
              {type}
            </FilterButton>
          ))}
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border p-1">
          <ViewButton active={view === 'grid'} onClick={() => setView('grid')} icon={LayoutGrid} label="Vista en grilla" />
          <ViewButton active={view === 'table'} onClick={() => setView('table')} icon={List} label="Vista en tabla" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">{emptyMessage}</p>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((proyecto) => (
            <ProjectCard key={proyecto.id} proyecto={proyecto} showOwner />
          ))}
        </div>
      ) : (
        <ProjectsTable proyectos={filtered} />
      )}
    </div>
  )
}
