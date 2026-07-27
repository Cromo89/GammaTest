import { useEffect, useRef } from 'react'
import { setupFlowingColorBend } from './flowing-color-bend-animation'
import type { FadeEdge } from './flowing-color-bend-draw'

const DEFAULT_SPEED = 0.00004

interface FlowingColorBendProps {
  fadeEdge: FadeEdge
  showGrain?: boolean
  grainHighlightIntensity?: number
  speed?: number
}

export function FlowingColorBend({
  fadeEdge,
  showGrain = true,
  grainHighlightIntensity = 1,
  speed = DEFAULT_SPEED,
}: FlowingColorBendProps) {
  const bandCanvasRef = useRef<HTMLCanvasElement>(null)
  const grainCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const bandCanvas = bandCanvasRef.current
    if (!bandCanvas) return
    return setupFlowingColorBend(bandCanvas, grainCanvasRef.current, { fadeEdge, grainHighlightIntensity, speed })
  }, [fadeEdge, showGrain, grainHighlightIntensity, speed])

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 size-full overflow-hidden" aria-hidden="true">
      <canvas ref={bandCanvasRef} className="absolute inset-0 size-full blur-[85px]" />
      {showGrain && <canvas ref={grainCanvasRef} className="absolute inset-0 size-full" />}
    </div>
  )
}
