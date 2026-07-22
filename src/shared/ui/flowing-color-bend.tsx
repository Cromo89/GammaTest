import { useEffect, useRef } from 'react'
import { draw, readBrandColors, type FadeEdge, type Mouse } from './flowing-color-bend-draw'

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
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const colors = readBrandColors()
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = 0
    let height = 0
    let frameId = 0
    let running = false
    let start = performance.now()
    let mouse: Mouse = null

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function loop(now: number) {
      if (!running) return
      draw(ctx!, (now - start) * speed, width, height, mouse, colors, fadeEdge, showGrain, grainHighlightIntensity)
      frameId = requestAnimationFrame(loop)
    }

    function handlePointerMove(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      mouse = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height ? { x, y } : null
    }

    function handlePointerLeave() {
      mouse = null
    }

    resize()
    draw(ctx, 0, width, height, mouse, colors, fadeEdge, showGrain, grainHighlightIntensity)

    if (!reduceMotion) {
      running = true
      frameId = requestAnimationFrame(loop)
      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerleave', handlePointerLeave)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (reduceMotion) return
      running = entry.isIntersecting
      if (running) {
        start = performance.now()
        frameId = requestAnimationFrame(loop)
      }
    })
    observer.observe(canvas)

    let resizeTimeout = 0
    function handleResize() {
      window.clearTimeout(resizeTimeout)
      resizeTimeout = window.setTimeout(() => {
        resize()
        draw(ctx!, 0, width, height, mouse, colors, fadeEdge, showGrain, grainHighlightIntensity)
      }, 150)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      running = false
      cancelAnimationFrame(frameId)
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
      window.clearTimeout(resizeTimeout)
    }
  }, [fadeEdge, showGrain, grainHighlightIntensity, speed])

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 -z-10 size-full" aria-hidden="true" />
}
