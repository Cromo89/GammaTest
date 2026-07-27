import { Globe, LayoutGrid, Rocket } from 'lucide-react'
import type { Proyecto } from '@/data/proyectos'
import { StatCard } from './stat-card'

export function ProjectStats({ proyectos }: { proyectos: Proyecto[] }) {
  const totalDeploys = proyectos.reduce((sum, proyecto) => sum + proyecto.deploys.length, 0)
  const onlineCount = proyectos.filter((proyecto) => proyecto.status === 'online').length
  const htmlCount = proyectos.filter((proyecto) => proyecto.type === 'HTML').length
  const reactCount = proyectos.filter((proyecto) => proyecto.type === 'React/Vite').length
  const nextCount = proyectos.filter((proyecto) => proyecto.type === 'Next.js').length

  return (
    <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
      <StatCard
        icon={LayoutGrid}
        label="Proyectos activos"
        value={proyectos.length}
        hint={`${htmlCount} HTML, ${reactCount} React/Vite, ${nextCount} Next.js`}
      />
      <StatCard
        icon={Rocket}
        label="Publicaciones"
        value={totalDeploys}
        hint={`en ${proyectos.length} proyecto${proyectos.length === 1 ? '' : 's'}`}
      />
      <StatCard icon={Globe} label="En línea" value={onlineCount} hint={`de ${proyectos.length} totales`} />
    </div>
  )
}
