# Contrato de Salida (carpeta de respaldo + schemas)

## Contenido
- Estructura de la carpeta de respaldo
- Schema común de `hallazgos.json`
- Escala de severidad compartida
- `resumen.json`
- Requisitos de los previews HTML

Este contrato es lo que hace consumible la auditoría por **cualquier implementador** — otra sesión, otra persona, otro skill (el consumidor ideal es `mock-frontend`, cuyo Paso 6 está diseñado para leer exactamente esta estructura, pero el contrato no depende de él). Todo lo visual (`preview.html`, `index.html`) se deriva de forma determinista de los `hallazgos.json` — el JSON es el artefacto bisagra, nunca al revés.

## Estructura de la carpeta de respaldo

Solo se escribe **si la persona lo aprobó explícitamente** (paso 5 del flujo). Raíz sugerida: `ui-audits/` en el proyecto auditado, o donde la persona indique. Una subcarpeta por corrida:

```
ui-audits/<slug-del-portal>-<fecha>/
  index.html        <- preview consolidado, punto de entrada
  resumen.json      <- metadata + conteos (el implementador lee el estado sin parsear HTML)
  01-heuristica/    hallazgos.json + preview.html
  02-iconos/        hallazgos.json + preview.html
  03-spacing/       hallazgos.json + preview.html
  04-tipografia/    hallazgos.json + preview.html
  05-color/         hallazgos.json + preview.html
  06-sombras/       hallazgos.json + preview.html
  07-radios/        hallazgos.json + preview.html
```

Si la corrida fue un subconjunto, solo existen las subcarpetas corridas — nunca crear carpetas vacías ni JSON con hallazgos placeholder.

## Schema común de `hallazgos.json`

```json
{
  "auditoria": "05-color",
  "proyecto": "portal-proveedores",
  "fecha": "2026-07-17",
  "alcance": { "pantallas": 12, "archivos_revisados": 84 },
  "resumen": "Una frase con el estado general de esta categoría",
  "hallazgos": [
    {
      "id": "COL-004",
      "titulo": "Tres azules distintos para el mismo rol de insignia",
      "severidad": "riesgo",
      "ubicaciones": [
        { "pantalla": "publicacion", "archivo": "src/pages/publicacion/Kpis.tsx", "linea": 31 },
        { "pantalla": "llegadas", "archivo": "src/pages/llegadas/Header.tsx", "linea": 12 }
      ],
      "descripcion": "Qué se encontró, en 1-2 frases ancladas al elemento real",
      "evidencia": "Valores concretos, snippet, o medición — nunca vacío ni genérico",
      "recomendacion": "El cambio concreto que lo resuelve, accionable sin re-analizar",
      "extra": { }
    }
  ]
}
```

Reglas del schema:

- **`id`**: prefijo por auditoría + correlativo — `HEU-`, `ICO-`, `SPC-`, `TIP-`, `COL-`, `SOM-`, `RAD-`. Estable dentro de la corrida (los previews y el implementador lo referencian).
- **Los 8 campos del hallazgo son obligatorios**; `extra` lleva los campos propios de cada auditoría (definidos en su metodología: cluster, valores encontrados, token propuesto, heurística, etc.) — nunca campos ad-hoc fuera de los declarados.
- **`ubicaciones` nunca vacío.** Un hallazgo que no se puede anclar a una pantalla/archivo/elemento real no se emite. Con input de solo screenshots, `archivo`/`linea` se omiten pero `pantalla` es obligatorio.
- **`evidencia` con datos, no adjetivos**: "gap de 12px en cards de publicacion vs 16px en llegadas", no "espaciado inconsistente".
- **`recomendacion` autosuficiente**: el implementador debe poder aplicarla leyendo solo el JSON, sin releer los HTML ni volver a correr el análisis.

## Escala de severidad compartida

Cinco niveles; cada auditoría declara en su metodología cuáles usa y con qué umbral:

| Nivel | Significado | ¿Genera hallazgo? |
|---|---|---|
| `critico` | Rompe función o legibilidad: bug de layout, contraste ilegible, flujo sin salida | Sí |
| `riesgo` | Inconsistencia visible entre pantallas que un usuario nota | Sí |
| `atencion` | Deuda que no se ve pero crece: dead code, valores sueltos, naming | Sí |
| `bueno` / `excelente` | Solo para rubrics de scoring (heurística); nunca aparecen como severidad de un hallazgo | No |

## `resumen.json`

```json
{
  "proyecto": "portal-proveedores",
  "fecha": "2026-07-17",
  "input": "repo",
  "alcance": { "pantallas": 12, "archivos_revisados": 84 },
  "auditorias": {
    "01-heuristica": { "hallazgos": 9, "por_severidad": { "critico": 1, "riesgo": 5, "atencion": 3 } },
    "05-color": { "hallazgos": 7, "por_severidad": { "critico": 1, "riesgo": 4, "atencion": 2 } }
  }
}
```

Solo las auditorías efectivamente corridas. `input` es `url`, `repo` o `screenshots` — le dice al implementador cuánta precisión esperar de 02–07.

## Requisitos de los previews HTML

Cada `preview.html` y el `index.html` son **standalone**: todo el CSS inline, sin dependencias externas (fuentes, CDNs, JS remoto), abribles con doble clic. Screenshots embebidos como data-URI o referidos con ruta relativa dentro de la carpeta de la corrida.

Contenido mínimo de cada `preview.html`:

1. **Encabezado** — proyecto, tipo de auditoría, fecha, alcance (pantallas/archivos revisados).
2. **Resumen** — total de hallazgos + distribución por severidad.
3. **Detalle por hallazgo** — id, ubicación, descripción, evidencia (screenshot recortado, snippet, o ambos), recomendación. Mismo orden que el JSON.
4. **Comparación lado a lado** — obligatoria en íconos, color, sombras y radios: las variantes encontradas del mismo concepto, renderizadas una junto a otra (swatches, cajas con la sombra/radio aplicado, íconos a tamaño real). El valor de estas auditorías está en VER la inconsistencia, no en leerla.

`index.html`: lista las auditorías corridas, una línea de resumen y conteo por severidad cada una, con link relativo a su `preview.html`. Es la puerta de entrada del resultado completo.
