# Metodología 05 — Auditoría de Color / Tokens

Requiere código fuente: se inventarían literales (hex/rgb/hsl/oklch) y usos de tokens reales, no colores estimados desde una captura.

## Procedimiento

1. **Inventariar:** grep de literales de color en componentes y estilos (fuera de la definición de tokens) + inventario de los tokens ya definidos en el sistema.
2. **Clusterizar** cada literal por dos ejes: **cercanía visual** (mismo matiz, diferencia leve de luminosidad/saturación → probablemente el mismo rol) y **rol semántico** (éxito/advertencia/error/info escritos como hex suelto).
3. **Mapear contra los tokens existentes:** ¿el literal duplica un token que ya existe, o representa un color legítimo que falta en la escala?
4. **Verificar contraste** (WCAG AA: 4.5:1 texto normal, 3:1 texto grande e íconos significativos) en los pares texto/fondo e ícono/insignia detectados.
5. **Emitir hallazgos** por cluster, con swatches lado a lado en el preview (ver la diferencia de tono, no leerla).

## Criterios de detección

| Regla | Hallazgo si… | Ruido aceptable |
|---|---|---|
| Literal que duplica token | Hex suelto igual o casi igual (ΔE perceptible solo lado a lado) a un token existente | Literales en la definición misma de tokens |
| Mismo rol, distinto tono | El mismo rol funcional (insignia informativa, link, borde activo) con tonos distintos entre pantallas | Variantes de estado (hover/pressed) derivadas con regla |
| Estado semántico sin token | Éxito/advertencia/error/info como hex suelto en vez del token de estado | — |
| Color legítimo sin token | Un color usado consistentemente ≥5 veces que no existe en la escala — recomendar crearlo | Colores de un embed/ilustración puntual |
| Contraste insuficiente | Par texto/fondo o ícono/insignia bajo WCAG AA | Texto decorativo genuino (no informativo) |

## Severidad

`critico`: contraste bajo AA en contenido informativo. `riesgo`: mismo rol con tonos distintos entre pantallas, estados semánticos sin token. `atencion`: literales que duplican tokens sin diferencia visible, color legítimo aún sin token.

## Schema — campos `extra`

```json
"extra": {
  "cluster": {
    "rol": "insignia-informativa",
    "valores": [
      { "color": "#3b82f6", "usos": 6, "pantallas": ["publicacion"] },
      { "color": "#1d4ed8", "usos": 3, "pantallas": ["enrolamiento"] },
      { "color": "#2563eb", "usos": 4, "pantallas": ["usuarios"] }
    ]
  },
  "token_propuesto": "var(--color-info)",
  "contraste": null
}
```

`contraste` (solo en hallazgos de contraste): `{ "par": "texto sobre insignia", "ratio": 2.8, "minimo": 4.5 }`.

## Ejemplos de hallazgo bien formado

```json
{
  "id": "COL-004",
  "titulo": "Tres azules distintos para el mismo rol de insignia informativa",
  "severidad": "riesgo",
  "ubicaciones": [
    { "pantalla": "publicacion", "archivo": "src/pages/publicacion/Kpis.tsx", "linea": 31 },
    { "pantalla": "enrolamiento", "archivo": "src/pages/enrolamiento/Header.tsx", "linea": 15 },
    { "pantalla": "usuarios", "archivo": "src/pages/usuarios/Badges.tsx", "linea": 9 }
  ],
  "descripcion": "La insignia informativa usa #3b82f6, #1d4ed8 y #2563eb según la pantalla — mismo rol, tres tonos, sin diferencia de estado que lo justifique.",
  "evidencia": "13 usos repartidos: #3b82f6 (6), #2563eb (4), #1d4ed8 (3); existe --color-info=#2563eb en tokens.css sin usar en 9 de los 13",
  "recomendacion": "Migrar los 13 usos a var(--color-info); verificar contraste del ícono blanco sobre ese tono al consolidar",
  "extra": { "cluster": { "rol": "insignia-informativa", "valores": [ { "color": "#3b82f6", "usos": 6, "pantallas": ["publicacion"] }, { "color": "#2563eb", "usos": 4, "pantallas": ["usuarios"] }, { "color": "#1d4ed8", "usos": 3, "pantallas": ["enrolamiento"] } ] }, "token_propuesto": "var(--color-info)", "contraste": null }
}
```

```json
{
  "id": "COL-007",
  "titulo": "Texto de estado 'pendiente' bajo el mínimo de contraste",
  "severidad": "critico",
  "ubicaciones": [{ "pantalla": "llegadas", "archivo": "src/pages/llegadas/EstadoBadge.tsx", "linea": 14 }],
  "descripcion": "El texto ámbar #f59e0b sobre fondo #fef3c7 del badge 'pendiente' queda en 1.9:1 — ilegible para baja visión y difícil para cualquiera con sol en la pantalla.",
  "evidencia": "ratio calculado 1.9:1; mínimo AA para texto de 12px: 4.5:1",
  "recomendacion": "Oscurecer el texto al tono 700 de la escala ámbar (#b45309 sobre #fef3c7 = 5.2:1) y tokenizar el par completo del badge",
  "extra": { "cluster": null, "token_propuesto": "var(--color-warning-strong)", "contraste": { "par": "texto sobre badge pendiente", "ratio": 1.9, "minimo": 4.5 } }
}
```
