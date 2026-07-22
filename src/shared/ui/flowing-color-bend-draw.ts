const GRAIN_GAP = 22
const GRAIN_RADIUS = 1.1
const GRAIN_PROXIMITY = 150

export type Point = [number, number]
export type Mouse = { x: number; y: number } | null
export type FadeEdge = 'top' | 'bottom'

export function readBrandColors() {
  const style = getComputedStyle(document.documentElement)
  return [
    style.getPropertyValue('--color-brand-teal').trim() || '#2dd4bf',
    style.getPropertyValue('--color-brand-cyan').trim() || '#20b8d8',
    style.getPropertyValue('--color-brand-blue').trim() || '#1b6ef3',
  ]
}

function drawGrain(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.fillStyle = 'rgba(210, 225, 235, 0.16)'
  ctx.beginPath()
  for (let y = GRAIN_GAP / 2; y < height; y += GRAIN_GAP) {
    for (let x = GRAIN_GAP / 2; x < width; x += GRAIN_GAP) {
      ctx.moveTo(x + GRAIN_RADIUS, y)
      ctx.arc(x, y, GRAIN_RADIUS, 0, Math.PI * 2)
    }
  }
  ctx.fill()
}

function drawGrainHighlight(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  mouse: Mouse,
  color: string,
  intensity: number,
) {
  if (!mouse) return
  const startX = Math.max(GRAIN_GAP / 2, Math.ceil((mouse.x - GRAIN_PROXIMITY - GRAIN_GAP / 2) / GRAIN_GAP) * GRAIN_GAP + GRAIN_GAP / 2)
  const startY = Math.max(GRAIN_GAP / 2, Math.ceil((mouse.y - GRAIN_PROXIMITY - GRAIN_GAP / 2) / GRAIN_GAP) * GRAIN_GAP + GRAIN_GAP / 2)
  const endX = Math.min(width, mouse.x + GRAIN_PROXIMITY)
  const endY = Math.min(height, mouse.y + GRAIN_PROXIMITY)

  ctx.fillStyle = color
  for (let y = startY; y < endY; y += GRAIN_GAP) {
    for (let x = startX; x < endX; x += GRAIN_GAP) {
      const dx = x - mouse.x
      const dy = y - mouse.y
      const dist = Math.hypot(dx, dy)
      if (dist >= GRAIN_PROXIMITY) continue
      const t = 1 - dist / GRAIN_PROXIMITY
      ctx.globalAlpha = t * 0.85 * intensity
      ctx.beginPath()
      ctx.arc(x, y, GRAIN_RADIUS + t * 2.4 * intensity, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  ctx.globalAlpha = 1
}

function bandY(s: number, t: number, height: number): number {
  const tilt = 0.62 + Math.sin(t * 0.18) * 0.18
  const base = height * 0.18 + s * height * tilt
  const wave =
    Math.sin(s * Math.PI * 2.1 + t) * height * 0.17 +
    Math.sin(s * Math.PI * 4.4 - t * 1.5) * height * 0.07 +
    Math.sin(s * Math.PI * 7.6 + t * 0.7) * height * 0.03
  return base + wave
}

function buildBandPoints(t: number, width: number, height: number): Point[] {
  const steps = 60
  const points: Point[] = []
  for (let i = 0; i <= steps; i++) {
    const s = i / steps
    points.push([s * width, bandY(s, t, height)])
  }
  return points
}

function buildGradient(ctx: CanvasRenderingContext2D, points: Point[], colors: string[]): CanvasGradient {
  const first = points[0]
  const last = points[points.length - 1]
  const gradient = ctx.createLinearGradient(first[0], first[1], last[0], last[1])
  gradient.addColorStop(0, colors[0])
  gradient.addColorStop(0.5, colors[1])
  gradient.addColorStop(1, colors[2])
  return gradient
}

function pathFor(ctx: CanvasRenderingContext2D, points: Point[]) {
  ctx.beginPath()
  ctx.moveTo(points[0][0], points[0][1])
  for (const [x, y] of points.slice(1)) ctx.lineTo(x, y)
}

function drawBand(ctx: CanvasRenderingContext2D, points: Point[], gradient: CanvasGradient) {
  ctx.lineCap = 'round'
  ctx.strokeStyle = gradient

  ctx.save()
  ctx.filter = 'blur(110px)'
  ctx.globalAlpha = 0.32
  ctx.lineWidth = 240
  pathFor(ctx, points)
  ctx.stroke()
  ctx.restore()

  ctx.save()
  ctx.filter = 'blur(60px)'
  ctx.globalAlpha = 0.4
  ctx.lineWidth = 100
  pathFor(ctx, points)
  ctx.stroke()
  ctx.restore()
}

function applyEdgeFade(ctx: CanvasRenderingContext2D, width: number, height: number, fadeEdge: FadeEdge) {
  const fadeSpan = height * (fadeEdge === 'top' ? 0.97 : 0.45)
  const y0 = fadeEdge === 'bottom' ? height - fadeSpan : fadeSpan
  const y1 = fadeEdge === 'bottom' ? height : 0
  const gradient = ctx.createLinearGradient(0, y0, 0, y1)
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 1)')
  ctx.save()
  ctx.globalCompositeOperation = 'destination-out'
  ctx.fillStyle = gradient
  ctx.fillRect(0, fadeEdge === 'bottom' ? y0 : 0, width, fadeSpan)
  ctx.restore()
}

export function draw(
  ctx: CanvasRenderingContext2D,
  t: number,
  width: number,
  height: number,
  mouse: Mouse,
  colors: string[],
  fadeEdge: FadeEdge,
  showGrain: boolean,
  grainHighlightIntensity: number,
) {
  ctx.clearRect(0, 0, width, height)
  if (showGrain) drawGrain(ctx, width, height)
  const points = buildBandPoints(t, width, height)
  const gradient = buildGradient(ctx, points, colors)
  drawBand(ctx, points, gradient)
  if (showGrain) drawGrainHighlight(ctx, width, height, mouse, colors[1], grainHighlightIntensity)
  applyEdgeFade(ctx, width, height, fadeEdge)
}
