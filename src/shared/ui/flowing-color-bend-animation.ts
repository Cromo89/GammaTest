import { drawBandLayer, drawGrainLayer, readBrandColors, type FadeEdge, type Mouse } from './flowing-color-bend-draw'

interface FlowingColorBendOptions {
  fadeEdge: FadeEdge
  grainHighlightIntensity: number
  speed: number
}

function setupCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, width: number, height: number, dpr: number) {
  canvas.width = width * dpr
  canvas.height = height * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

export function setupFlowingColorBend(
  bandCanvas: HTMLCanvasElement,
  grainCanvas: HTMLCanvasElement | null,
  { fadeEdge, grainHighlightIntensity, speed }: FlowingColorBendOptions,
) {
  const bandCtx = bandCanvas.getContext('2d')
  const grainCtx = grainCanvas?.getContext('2d') ?? null
  if (!bandCtx) return () => {}

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
    const rect = bandCanvas.getBoundingClientRect()
    width = rect.width
    height = rect.height
    setupCanvas(bandCanvas, bandCtx!, width, height, dpr)
    if (grainCanvas && grainCtx) setupCanvas(grainCanvas, grainCtx, width, height, dpr)
  }

  function render(t: number) {
    drawBandLayer(bandCtx!, t, width, height, colors, fadeEdge)
    if (grainCanvas && grainCtx) drawGrainLayer(grainCtx, width, height, mouse, colors[1], fadeEdge, grainHighlightIntensity)
  }

  function loop(now: number) {
    if (!running) return
    render((now - start) * speed)
    frameId = requestAnimationFrame(loop)
  }

  function handlePointerMove(event: PointerEvent) {
    const rect = bandCanvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    mouse = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height ? { x, y } : null
  }

  function handlePointerLeave() {
    mouse = null
  }

  resize()
  render(0)

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
  observer.observe(bandCanvas)

  let resizeTimeout = 0
  function handleResize() {
    window.clearTimeout(resizeTimeout)
    resizeTimeout = window.setTimeout(() => {
      resize()
      render(0)
    }, 150)
  }
  window.addEventListener('resize', handleResize)

  return function cleanup() {
    running = false
    cancelAnimationFrame(frameId)
    observer.disconnect()
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerleave', handlePointerLeave)
    window.clearTimeout(resizeTimeout)
  }
}
