# Metodología 02 — Auditoría de Íconos

Requiere código fuente (registro de íconos, imports, props de tamaño/color). Desde captura solo se detecta una fracción — avisarlo si es el caso.

## Procedimiento

1. **Inventariar:** localizar el registro/librería de íconos del proyecto (componente `Icon`, carpeta de SVGs, paquete externo) y grepear todos los usos con su nombre, tamaño y color efectivos.
2. **Agrupar por concepto:** mismo significado semántico = mismo grupo (ej. "editar", "eliminar", "alerta"), aunque usen SVGs distintos.
3. **Emitir hallazgos** según los criterios de abajo, con comparación lado a lado en el preview (los íconos renderizados a tamaño real, no descritos).

## Criterios de detección

| Regla | Hallazgo si… | Ruido aceptable |
|---|---|---|
| Mismo concepto, distinto glifo | Dos SVGs diferentes para el mismo significado (dos "papeleras" distintas) | Variantes deliberadas documentadas (filled para activo, outline para inactivo) |
| Mismo contexto, distinto tamaño | El mismo tipo de superficie (celdas de tabla, headers de card, badges) mezcla tamaños para el mismo rol | ±1px por contexto de render distinto, si sale del mismo token |
| Estilo mezclado | Sólidos y outline conviven en la misma familia/superficie sin regla | Familias separadas por zona (nav sólido, contenido outline) aplicadas consistentemente |
| Mismo concepto, distinto tono | El mismo ícono con colores distintos sin diferencia de estado que lo justifique | Cambios de tono por estado (hover, disabled, activo) |
| Escala sin nombre | Más de 3 tamaños distintos en uso sin escala nombrada (`sm`/`md`/`lg`) — proponer la escala reducida como recomendación | 2-3 tamaños aunque sean números sueltos |
| Dead code | Ícono registrado con 0 usos reales (grep sin resultados fuera del registro) | — |
| Nombre duplicado | Dos entradas del registro con el mismo nombre o nombres distintos para el mismo SVG | — |
| Mal dibujado | Trazo cortado, viewBox desalineado, relleno que se sale del contorno — se detecta renderizando, no solo leyendo | — |

## Severidad

`critico`: ícono mal dibujado o un mismo glifo con significados opuestos entre pantallas. `riesgo`: inconsistencia visible en superficies principales (tamaño/estilo/tono mezclados). `atencion`: dead code, nombres duplicados, escala sin nombrar.

## Schema — campos `extra`

```json
"extra": {
  "concepto": "eliminar",
  "variantes": [
    { "nombre": "trash", "tamano": "16px", "color": "#64748b", "pantallas": ["usuarios"] },
    { "nombre": "trash-alt", "tamano": "20px", "color": "#ef4444", "pantallas": ["publicacion"] }
  ],
  "escala_propuesta": { "md": "16px", "lg": "20px" }
}
```

`variantes` alimenta la comparación lado a lado del preview. `escala_propuesta` solo en el hallazgo de escala (uno por corrida, no repetido por ícono).

## Ejemplos de hallazgo bien formado

```json
{
  "id": "ICO-003",
  "titulo": "Cinco tamaños de ícono en celdas de tabla para el mismo rol",
  "severidad": "riesgo",
  "ubicaciones": [
    { "pantalla": "usuarios", "archivo": "src/pages/usuarios/Tabla.tsx", "linea": 41 },
    { "pantalla": "llegadas", "archivo": "src/pages/llegadas/Tabla.tsx", "linea": 58 }
  ],
  "descripcion": "Las acciones de fila usan íconos de 14, 15, 16, 18 y 20px según la pantalla, siendo el mismo rol (acción sobre el registro).",
  "evidencia": "grep de size= en celdas: 14(2 usos), 15(1), 16(9), 18(3), 20(2)",
  "recomendacion": "Definir escala md=16px para acción de fila y homologar los 17 usos; reservar lg=20px para headers",
  "extra": { "concepto": "accion-de-fila", "variantes": [ { "nombre": "varios", "tamano": "14-20px", "color": "token", "pantallas": ["usuarios", "llegadas", "publicacion"] } ], "escala_propuesta": { "md": "16px", "lg": "20px" } }
}
```

```json
{
  "id": "ICO-006",
  "titulo": "Ícono de insignia con tres tonos de azul distintos",
  "severidad": "riesgo",
  "ubicaciones": [
    { "pantalla": "publicacion", "archivo": "src/pages/publicacion/Kpis.tsx", "linea": 22 },
    { "pantalla": "enrolamiento", "archivo": "src/pages/enrolamiento/Header.tsx", "linea": 15 }
  ],
  "descripcion": "El mismo ícono informativo sobre insignia circular usa #2563eb, #3b82f6 y #1d4ed8 en pantallas distintas, sin diferencia de estado.",
  "evidencia": "fill computado: publicacion #3b82f6, enrolamiento #1d4ed8, usuarios #2563eb",
  "recomendacion": "Unificar al token de color informativo del sistema; hallazgo espejo en 05-color (COL-*) — referenciarlo, no duplicar el trabajo",
  "extra": { "concepto": "info-badge", "variantes": [ { "nombre": "info", "tamano": "16px", "color": "#3b82f6", "pantallas": ["publicacion"] }, { "nombre": "info", "tamano": "16px", "color": "#1d4ed8", "pantallas": ["enrolamiento"] } ] }
}
```
