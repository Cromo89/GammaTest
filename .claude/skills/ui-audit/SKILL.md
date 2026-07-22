---
name: ui-audit
description: Usar cuando se pide auditar, revisar o evaluar el diseño/UX de un portal, app o sitio web ya construido — propio o de terceros — en cualquiera de estas dimensiones - heurísticas de usabilidad (Nielsen), íconos, spacing/layout, tipografía, color/tokens, sombras o radios. Acepta como input una URL, el path de un repo, o screenshots. Es de solo análisis - también aplica cuando se pide "detectar inconsistencias visuales" o "revisar la consistencia del design system" de un proyecto.
---

# UI Audit

## Resumen

Skill de **solo análisis** que genera hasta 7 auditorías de diseño/UX sobre un producto ya construido, cada una con metodología propia (criterios de detección, modelo de severidad, schema de salida). Produce un `hallazgos.json` + un `preview.html` navegable por auditoría, y — solo si la persona lo aprueba — deja todo respaldado en una carpeta con [contrato de salida](references/contrato-de-salida.md) estable.

**No depende de ningún otro skill.** Funciona solo, de punta a punta: auditar sitios de terceros (competencia, referencia, cliente) donde nunca se va a implementar nada es un uso completo en sí mismo. El respaldo existe para que *cualquier* sesión o skill implementador lo consuma después — el caso ideal es el skill `mock-frontend` (su Paso 6 está diseñado para leer este contrato), pero ui-audit no lo requiere ni sabe si existe.

## Reglas duras

1. **Nunca modifica el proyecto auditado.** Ni un archivo, ni siquiera si un hallazgo parece trivial de arreglar. Si la persona pide "arreglalo ya" en medio de la auditoría, la respuesta es: ui-audit es solo análisis; implementar es trabajo de una sesión aparte sobre el respaldo (idealmente con el skill `mock-frontend`, si el proyecto es un mock construido con él) — no se mezclan ambos roles en la misma corrida.
2. **Todo hallazgo va anclado con evidencia.** Ubicación real (pantalla/archivo/línea) + datos concretos (valores, snippet, medición). Un hallazgo que no se puede anclar no se emite.
3. **Respaldar solo con aprobación explícita.** Al terminar se pregunta — nunca se asume — si dejar la carpeta de respaldo. Si dice que no, no se persiste nada más allá de lo mostrado.
4. **Cada corrida es autocontenida.** No hay modo incremental ni reanudación de una auditoría a medio hacer; una carpeta de respaldo existente no se re-analiza salvo que la persona pida una auditoría nueva.

## Qué recibe como input

| Input | Auditorías posibles |
|---|---|
| **Path de repo/proyecto local** | Las 7, con máxima precisión |
| **URL pública** | Heurística completa (captura vía navegador con automatización si hay, o `https://api.microlink.io/?url=<URL>&screenshot=true`); las otras 6 solo a lo detectable visualmente — menos preciso |
| **Screenshots de la persona** | Igual que URL, sin poder navegar flujos |

Las auditorías 02–07 (íconos, spacing, tipografía, color, sombras, radios) necesitan **leer código fuente** para inventariar valores reales (clases, hex, tamaños) — no se infieren de forma confiable desde una captura. Si dan una URL sin código: avisar esa limitación y ofrecer correr solo heurística, o pedir el path del repo si existe.

## Las 7 auditorías

Default si no especifican: correr las 7. La persona puede pedir un subconjunto ("solo tipografía y color"). Cargar solo la metodología de la auditoría que se va a correr.

| Auditoría | Qué detecta | Metodología |
|---|---|---|
| **01 Heurística** | Violaciones a las 10 heurísticas de Nielsen, con rubric de scoring | [01-heuristica.md](references/01-heuristica.md) |
| **02 Íconos** | Inconsistencias de tamaño/estilo/tono, dead code, íconos mal dibujados | [02-iconos.md](references/02-iconos.md) |
| **03 Spacing/Layout** | Bugs de layout, z-index en conflicto, fills y transiciones inconsistentes | [03-spacing.md](references/03-spacing.md) |
| **04 Tipografía** | Proliferación de tamaños, clusters sin rol, componentes disfrazados de texto | [04-tipografia.md](references/04-tipografia.md) |
| **05 Color/Tokens** | Hex sueltos, mismo rol con distinto tono, estados semánticos sin token, contraste | [05-color.md](references/05-color.md) |
| **06 Sombras** | Valores de sombra sueltos, misma elevación con distinta sombra, tinte inconsistente | [06-sombras.md](references/06-sombras.md) |
| **07 Radios** | Variación accidental de border-radius, mismo componente con esquinas distintas | [07-radios.md](references/07-radios.md) |

## Flujo de trabajo

1. Recibir input (URL / path / screenshots) y confirmar qué auditorías correr.
2. Ejecutar cada auditoría según su metodología: **inventariar → agrupar/clusterizar → emitir hallazgos** con evidencia concreta, nunca genéricos.
3. Generar el `preview.html` de cada auditoría + el `index.html` consolidado, según el [contrato de salida](references/contrato-de-salida.md).
4. Mostrar el resultado: indicar la ruta del `index.html` (o abrirlo) y dar un resumen ejecutivo en el chat — cuántos hallazgos por auditoría, los 2-3 más relevantes.
5. Preguntar explícitamente: *"¿Quieres que deje esta auditoría respaldada en una carpeta para implementar los cambios más adelante?"* (si el proyecto es un mock construido con `mock-frontend`, mencionar que su Paso 6 puede cargarla directo).
6. Si aprueba → guardar con la estructura del contrato. Si no → no persistir.
7. **ui-audit termina ahí.** No continúa hacia la implementación aunque la persona apruebe el respaldo — eso es trabajo de otra sesión/skill.

## Errores comunes

| Error | Corrección |
|---|---|
| Editar el proyecto auditado "de paso" porque el fix es obvio | Regla dura #1: solo análisis; la implementación es de otra sesión/skill |
| Emitir hallazgos genéricos ("mejorar la consistencia de espaciado") | Anclar a elemento real con valores medidos, o no emitir |
| Correr 02–07 desde una captura y presentarlas con la misma confianza que con código | Avisar la limitación; marcar `input` en `resumen.json` |
| Respaldar la carpeta sin preguntar "para adelantar trabajo" | Preguntar siempre; sin aprobación no se persiste |
| Decidir por la persona qué hallazgos implementar o priorizar la implementación | Fuera de alcance: eso se decide en la sesión de implementación, con la persona presente |
| Previews con CSS/JS externo o fuentes de CDN | Standalone: todo inline, abrible con doble clic |
