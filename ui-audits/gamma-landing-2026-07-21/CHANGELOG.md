# Changelog de implementación — gamma-landing-2026-07-21

Todos los hallazgos de la auditoría fueron implementados (alcance: completo, 11/11).

## 01-heuristica

- **HEU-001** (resuelto) — `landing-nav.tsx` ahora usa un `IntersectionObserver` (`use-active-section.ts`) para resaltar en el nav la sección visible durante el scroll.
- **HEU-002** (resuelto) — `landing-permanence.tsx` reescrita: de 3 cards tipo pricing (badge + precio grande + checklist + plan "destacado") a un timeline horizontal de 3 nodos numerados y conectados, sin card individual ni nivel destacado.
- **HEU-003** (resuelto) — los 3 CTA hacia el dashboard (`landing-nav.tsx`, `landing-hero.tsx`, `landing-cta.tsx`) cambiaron su ícono de `ArrowRight` a `ExternalLink` + `title="Se abre en una pestaña nueva"`.
- **HEU-004** (resuelto) — `landing-steps.tsx` ("Cómo funciona") ahora vive en una sección de ancho completo con `bg-muted/40` y bordes horizontales, rompiendo la repetición de las demás secciones.

## 02-iconos

- **ICO-001** (resuelto) — el glifo `⚛` que no renderizaba fue reemplazado por el ícono real `Atom` de lucide-react en `landing-formats.tsx`.
- **ICO-002** (resuelto) — los 6 glifos Unicode (`↥ ⌁ ◉ </> ⚛ N`) migraron a SVG de lucide-react: `Server`, `Link2`, `Eye` en `landing-problem.tsx`; `Code2`, `Atom`, `Layers` en `landing-formats.tsx`.

## 03-spacing / 04-tipografia

- **SPC-001 / TIP-001** (resuelto) — `shared/ui/button.tsx` ganó una variante `size` (`md` = comportamiento anterior, `lg` = 48px). Los 4 CTA de la landing (nav, hero primario, hero secundario, cta final) migraron de className repetido a `<Button size="lg">`, eliminando las 3 alturas/tamaños de texto distintos.

## 05-color

- **COL-001** (resuelto) — `brand-mark.tsx` y los glows de fondo de `landing-hero.tsx`/`landing-cta.tsx` dejaron de repetir `#2dd4bf`/`#20b8d8`/`#1b6ef3` como literal y ahora usan `var(--color-brand-*)` (con `color-mix()` para la opacidad de los glows).
- **COL-002** (resuelto) — el `shadow` del punto "disponible" en `landing-hero.tsx` pasó de `#34d399` literal a `var(--color-success)`.

## 07-radios

- **RAD-001** (resuelto) — se agregó `--radius-brand-mark: 7px` en `tokens.css` (con comentario explicando que es una excepción de marca), y `brand-mark.tsx` lo referencia en vez del valor arbitrario `rounded-[7px]`.

## Verificación de cierre

- `tsc -b --noEmit`: sin errores
- `pnpm build`: sin errores
- `pnpm lint`: sin warnings nuevos (los 2 preexistentes son ajenos a este trabajo — patrón de fast-refresh en `router.tsx` y `use-user-tier.tsx`)
- Verificación visual en `localhost:5178`: las 6 secciones revisadas contra los `preview.html` de cada categoría
