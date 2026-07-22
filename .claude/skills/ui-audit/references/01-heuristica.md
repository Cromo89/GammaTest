# Metodología 01 — Auditoría Heurística (Nielsen)

## Contenido
- Alcance e input
- Criterios de detección por heurística
- Modelo de severidad y scoring
- Schema de salida (campos `extra`)
- Procedimiento
- Ejemplos de hallazgo bien formado

## Alcance e input

Única auditoría que corre completa **sin código fuente**: alcanza con URL navegable o screenshots. Con acceso a navegador automatizado, recorrer los flujos reales (no solo pantallas estáticas) — varios criterios (feedback, prevención de error, recuperación) solo se observan interactuando. Con screenshots estáticos, marcar en el resumen que los criterios de interacción quedaron evaluados parcialmente.

## Criterios de detección por heurística

Para cada pantalla/flujo, responder estas preguntas operables. Cada "no" con impacto real es un hallazgo candidato:

| # | Heurística | Preguntas operables |
|---|---|---|
| H1 | Visibilidad del estado | ¿Toda acción asíncrona muestra loading? ¿El resultado (éxito/fallo) se confirma visiblemente? ¿La navegación indica dónde estoy (item activo, breadcrumb)? |
| H2 | Sistema ↔ mundo real | ¿El copy usa lenguaje del dominio del usuario o jerga técnica/interna? ¿Los formatos (fecha, moneda, unidades) son los locales del público? |
| H3 | Control y libertad | ¿Toda acción de varios pasos tiene salida (cancelar, volver) sin penalidad? ¿Los modales/drawers cierran con Esc y clic afuera? ¿Hay deshacer donde se destruye algo? |
| H4 | Consistencia y estándares | ¿La misma acción tiene el mismo nombre/posición/ícono en todas las pantallas? ¿Los patrones (tabla, filtros, paginación) se comportan igual entre pantallas? |
| H5 | Prevención de errores | ¿Las acciones destructivas confirman? ¿Los inputs restringen formato antes de validar (máscaras, min/max, selects vs. texto libre)? ¿Hay guardrails contra estados imposibles (fecha fin < inicio)? |
| H6 | Reconocer > recordar | ¿Las opciones están visibles o hay que recordar códigos/valores? ¿Los filtros aplicados se muestran como chips/resumen? ¿Los campos muestran ejemplo o formato esperado? |
| H7 | Flexibilidad y eficiencia | ¿Hay atajos para el usuario frecuente (búsqueda, acciones en lote, defaults inteligentes)? ¿Las tablas largas permiten ordenar/filtrar? |
| H8 | Diseño minimalista | ¿Cada elemento de la pantalla compite por atención con el contenido principal? ¿Hay información duplicada o decoración sin función? |
| H9 | Recuperación de errores | ¿Los mensajes de error dicen qué pasó, en lenguaje simple, y cómo resolverlo? ¿O son códigos/mensajes crudos del sistema? ¿El error aparece junto al campo que lo causó? |
| H10 | Ayuda y documentación | ¿Los conceptos no obvios tienen tooltip/hint en contexto? ¿Los estados vacíos explican qué hacer para llenarlos? |

Umbral de ruido: una inconsistencia de copy aislada en una pantalla secundaria no es hallazgo; el mismo problema repetido, o uno solo en un flujo principal, sí.

## Modelo de severidad y scoring

Dos salidas complementarias:

- **Hallazgos** con severidad `critico` (bloquea o corrompe una tarea: flujo sin salida, error silencioso, acción destructiva sin confirmar), `riesgo` (fricción visible: feedback ausente, copy confuso en flujo principal) o `atencion` (mejora clara pero no urgente).
- **Score por heurística** (rubric de 5 niveles, va en `extra` del JSON y en el preview): `excelente` (sin hallazgos, con ejemplos positivos), `bueno` (sin hallazgos), `atencion` (solo hallazgos menores), `riesgo` (≥1 hallazgo riesgo), `critico` (≥1 hallazgo crítico).

## Schema de salida — campos `extra`

Sobre el [schema común](contrato-de-salida.md), cada hallazgo agrega:

```json
"extra": {
  "heuristica": "H5",
  "flujo": "creación de publicación",
  "mejora_ejemplo": "Deshabilitar el botón Guardar y mostrar '3 campos faltan' hasta que el formulario esté completo"
}
```

Y el JSON de la auditoría agrega, a nivel raíz, `"scores": { "H1": "bueno", ..., "H10": "atencion" }`.

## Procedimiento

1. Inventariar pantallas y flujos disponibles (desde el router/nav si hay código; navegando si es URL).
2. Recorrer cada pantalla/flujo aplicando la tabla de preguntas — anotar candidatos con su ubicación exacta.
3. Consolidar: agrupar candidatos que son el mismo problema en varias pantallas en UN hallazgo con múltiples `ubicaciones` (es un problema sistémico, no N problemas).
4. Asignar severidad, calcular scores, redactar `mejora_ejemplo` concreta por hallazgo.
5. Emitir `hallazgos.json` + `preview.html` (detalle por hallazgo con screenshot recortado del elemento señalado).

## Ejemplos de hallazgo bien formado

```json
{
  "id": "HEU-002",
  "titulo": "Guardar sin validación previa: el error aparece recién al enviar",
  "severidad": "riesgo",
  "ubicaciones": [{ "pantalla": "enrolamiento", "archivo": "src/pages/enrolamiento/Form.tsx", "linea": 74 }],
  "descripcion": "El formulario permite enviar con campos obligatorios vacíos; la validación corre después del submit y muestra un error genérico arriba del formulario.",
  "evidencia": "Submit con RUT vacío → toast 'Error en el formulario' sin señalar el campo",
  "recomendacion": "Validar por campo al perder foco y anclar el mensaje junto al campo; deshabilitar el submit mientras falten obligatorios",
  "extra": { "heuristica": "H5", "flujo": "enrolamiento de proveedor", "mejora_ejemplo": "Borde rojo + 'El RUT es obligatorio' bajo el campo, botón deshabilitado con contador de faltantes" }
}
```

```json
{
  "id": "HEU-005",
  "titulo": "Filtros aplicados invisibles tras cerrar el panel",
  "severidad": "atencion",
  "ubicaciones": [
    { "pantalla": "llegadas" },
    { "pantalla": "publicacion" }
  ],
  "descripcion": "Al aplicar filtros y cerrar el drawer, la tabla cambia pero nada indica qué filtros están activos — hay que recordarlos (H6) o reabrir el panel.",
  "evidencia": "Filtro 'estado=pendiente' aplicado: la tabla muestra 4 filas sin ningún chip/indicador visible del filtro",
  "recomendacion": "Mostrar los filtros activos como chips removibles sobre la tabla, con un 'limpiar todo'",
  "extra": { "heuristica": "H6", "flujo": "consulta con filtros", "mejora_ejemplo": "Chips 'Estado: Pendiente ×' entre la barra de filtros y la tabla" }
}
```
