# Metodología 03 — Auditoría de Spacing / Layout

Requiere código fuente y, idealmente, la app corriendo: los bugs de layout se **miden** en el DOM (getBoundingClientRect, scrollHeight, z-index computado), no se leen en el código ni se adivinan en una captura.

## Procedimiento

1. **Inventariar:** grep de paddings/gaps/margins en contenedores de página y componentes compartidos; inventario de z-index en uso (declarados y computados); inventario de transiciones/animaciones de entrada-salida.
2. **Comparar entre pantallas del mismo patrón:** las pantallas de una misma familia estructural (lista, tabla+filtros, formulario) deben compartir medidas de contenedor.
3. **Ejercitar los overlays:** abrir drawers/modales con dropdowns, selects y tooltips activos — ahí viven los conflictos de z-index.
4. **Emitir hallazgos**, priorizando causa a nivel de **contenedor** (compartida entre pantallas) sobre síntomas por pantalla.

## Criterios de detección

| Regla | Hallazgo si… | Ruido aceptable |
|---|---|---|
| Contenedor inconsistente | Pantallas del mismo patrón difieren en padding/gap del contenedor principal | Diferencias intencionales entre familias distintas |
| Bug de layout | Overflow no deseado, scroll doble, contenido cortado, salto de layout al cargar | — (esto es binario: hay bug o no) |
| Conflicto de z-index | Un elemento flotante (select desplegado, tooltip, dropdown) queda por debajo de un overlay grande (drawer, modal) | Apilamiento correcto aunque los números no sigan una escala |
| Fill inconsistente | Inputs, selects y buscadores con backgrounds distintos en el mismo contexto | Variantes deliberadas (filled vs. outlined) usadas con regla |
| Transiciones dispares | Entrada/salida del mismo tipo de overlay con duraciones/curvas distintas, o animaciones que ignoran `prefers-reduced-motion` | Duraciones distintas para tipos distintos (toast vs. modal) |

## Severidad

`critico`: bug de layout o z-index que bloquea interacción (no se puede elegir una opción del select). `riesgo`: inconsistencia de contenedor o fill visible entre pantallas hermanas. `atencion`: transiciones dispares, `prefers-reduced-motion` ausente, escala de z-index sin nombrar.

## Schema — campos `extra`

```json
"extra": {
  "medicion": { "propiedad": "z-index", "esperado": "select > drawer", "obtenido": { "select": 50, "drawer": 400 } },
  "nivel": "contenedor"
}
```

`medicion` guarda los valores del inspector — es la evidencia que el implementador re-mide tras el fix. `nivel` es `contenedor` o `pantalla`.

## Ejemplos de hallazgo bien formado

```json
{
  "id": "SPC-001",
  "titulo": "Select desplegado queda debajo del drawer de filtros",
  "severidad": "critico",
  "ubicaciones": [{ "pantalla": "llegadas", "archivo": "src/shared/ui/select/Select.tsx", "linea": 12 }],
  "descripcion": "Dentro del drawer de filtros, el menú del Select se renderiza detrás del propio drawer: las opciones existen pero no se ven ni se pueden clickear.",
  "evidencia": "z-index computado: contenido del select 50, drawer 400; el portal del select monta fuera del stacking context del drawer",
  "recomendacion": "Definir escala de capas nombrada (dropdown > drawer > modal-base) en tokens y aplicarla al portal del select",
  "extra": { "medicion": { "propiedad": "z-index", "esperado": "select > drawer", "obtenido": { "select": 50, "drawer": 400 } }, "nivel": "contenedor" }
}
```

```json
{
  "id": "SPC-004",
  "titulo": "Padding del contenedor principal difiere entre pantallas de la familia lista",
  "severidad": "riesgo",
  "ubicaciones": [
    { "pantalla": "usuarios", "archivo": "src/pages/usuarios/UsuariosPage.tsx", "linea": 18 },
    { "pantalla": "publicacion", "archivo": "src/pages/publicacion/PublicacionPage.tsx", "linea": 21 }
  ],
  "descripcion": "Mismo patrón de página (lista simple) con padding de contenedor distinto: 24px en usuarios, 16px en publicacion — el contenido 'salta' al navegar entre ellas.",
  "evidencia": "getBoundingClientRect del main: usuarios x=264, publicacion x=256 con el mismo sidebar",
  "recomendacion": "Mover el padding al layout compartido de la familia (un solo lugar) y quitarlo de las páginas",
  "extra": { "medicion": { "propiedad": "padding-left", "esperado": "igual entre hermanas", "obtenido": { "usuarios": "24px", "publicacion": "16px" } }, "nivel": "contenedor" }
}
```
