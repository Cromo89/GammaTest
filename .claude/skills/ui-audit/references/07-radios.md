# Metodología 07 — Auditoría de Radios (border-radius)

Requiere código fuente: se inventarían los `border-radius` reales. Se evalúa junto a sombras (06) — mismas superficies.

## Procedimiento

1. **Inventariar:** grep de todos los border-radius en uso (clases, CSS, inline) con valor, componente y conteo.
2. **Clusterizar variación accidental:** valores a ≤2px de distancia sobre el mismo tipo de componente son un mismo rol fragmentado (ej. 8/9/10px en cards). `9999px`/`50%` ("pill"/círculo) es un caso aparte, no parte de la escala.
3. **Comparar por tipo de componente entre pantallas:** el mismo tipo (card, botón, input, badge) debe tener el mismo radio en todas las pantallas.
4. **Proponer escala nombrada** (chico/mediano/grande + pill) a partir de los clusters.
5. **Emitir hallazgos** por cluster/tipo, con cajas renderizadas lado a lado en el preview.

## Criterios de detección

| Regla | Hallazgo si… | Ruido aceptable |
|---|---|---|
| Variación accidental | ≥2 valores a ≤2px sobre el mismo tipo de componente | Roles genuinamente distintos (input 6px vs. card 12px) |
| Mismo tipo, distinto radio entre pantallas | Cards (o botones, o inputs) con radio distinto según la pantalla | Variantes deliberadas y documentadas |
| Valores sueltos sin escala | Más de 3-4 radios distintos (sin contar pill) sin escala nombrada | Escala nombrada aunque sea amplia |
| Radio incoherente anidado | Elemento interno con radio mayor que su contenedor inmediato (esquinas que "chocan") | Diferencia calculada (radio interno = externo − padding) |
| Pill inconsistente | Elementos del mismo rol donde unos usan pill y otros radio grande | — |

## Severidad

`riesgo`: mismo tipo de componente con radio distinto entre pantallas, anidado incoherente visible. `atencion`: variación accidental de pocos px, escala sin nombrar. (Sin `critico` propio: un radio no rompe función.)

## Schema — campos `extra`

```json
"extra": {
  "tipo_componente": "card",
  "valores": [
    { "radio": "8px", "usos": 14, "pantallas": ["usuarios", "llegadas"] },
    { "radio": "9px", "usos": 2, "pantallas": ["enrolamiento"] },
    { "radio": "10px", "usos": 5, "pantallas": ["publicacion"] }
  ],
  "escala_propuesta": { "sm": "6px", "md": "8px", "lg": "12px", "pill": "9999px" }
}
```

`escala_propuesta` solo en el hallazgo de escala (uno por corrida).

## Ejemplo de hallazgo bien formado

```json
{
  "id": "RAD-001",
  "titulo": "Cards con 8, 9 y 10px de radio — un solo rol fragmentado en tres valores",
  "severidad": "atencion",
  "ubicaciones": [
    { "pantalla": "usuarios", "archivo": "src/pages/usuarios/Kpis.tsx", "linea": 10 },
    { "pantalla": "enrolamiento", "archivo": "src/pages/enrolamiento/Resumen.tsx", "linea": 22 },
    { "pantalla": "publicacion", "archivo": "src/pages/publicacion/Kpis.tsx", "linea": 14 }
  ],
  "descripcion": "El mismo tipo de componente (card de contenido) usa 8px (14 usos), 9px (2) y 10px (5) según la pantalla — variación accidental, no intencional: son el mismo rol.",
  "evidencia": "grep border-radius sobre cards: 8px×14, 9px×2, 10px×5; el token --radius-md=8px existe y solo lo usan los 14 primeros",
  "recomendacion": "Homologar los 21 usos a var(--radius-md) en un lote; los 9px y 10px no responden a ninguna intención registrada",
  "extra": { "tipo_componente": "card", "valores": [ { "radio": "8px", "usos": 14, "pantallas": ["usuarios", "llegadas"] }, { "radio": "9px", "usos": 2, "pantallas": ["enrolamiento"] }, { "radio": "10px", "usos": 5, "pantallas": ["publicacion"] } ], "escala_propuesta": { "sm": "6px", "md": "8px", "lg": "12px", "pill": "9999px" } }
}
```
