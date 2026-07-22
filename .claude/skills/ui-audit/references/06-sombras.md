# Metodología 06 — Auditoría de Sombras

Requiere código fuente: se inventarían los `box-shadow` reales (clases de utilidad, CSS, inline). Se evalúa junto a radios (07) — mismas superficies: cards, drawers, modales, popovers.

## Procedimiento

1. **Inventariar:** grep de todos los box-shadow en uso, con valor completo (offsets, blur, spread, color, alpha) y superficie donde se aplica.
2. **Agrupar por rol de elevación:** card en reposo · panel flotante (dropdown, popover, tooltip) · overlay grande (drawer, modal) · hover/focus. El rol lo define la superficie, no el valor.
3. **Comparar dentro de cada rol:** todos los usos de un rol deberían compartir un valor; las variantes son hallazgos.
4. **Emitir hallazgos** por rol, con cajas renderizadas lado a lado en el preview (la elevación se ve, no se lee).

## Criterios de detección

| Regla | Hallazgo si… | Ruido aceptable |
|---|---|---|
| Mismo rol, distinta sombra | Dos superficies del mismo rol (dos tipos de card en reposo) con box-shadow distinto | Diferencia deliberada de jerarquía dentro del rol, aplicada con regla |
| Valores sueltos sin token | box-shadow escritos a mano habiendo (o faltando) tokens por rol — proponer `shadow-card` / `shadow-popover` / `shadow-overlay` | Un único valor global consistente aunque no esté tokenizado |
| Tinte inconsistente | Sombras neutras (negro alpha) mezcladas con sombras tintadas de marca sin regla | Todo neutro, o todo tintado con regla |
| Intensidad invertida | Un elemento de menor elevación proyecta sombra más fuerte que uno que flota por encima | — |
| Elevación sin sombra | Un overlay que tapa contenido sin sombra ni borde que lo separe del fondo | Diseños flat deliberados y consistentes |

## Severidad

`riesgo`: mismo rol con sombras visiblemente distintas entre pantallas, intensidad invertida. `atencion`: valores sueltos sin token, tinte mezclado sin síntoma fuerte. (Sin nivel `critico` propio: una sombra no rompe función — si un caso lo hace, es un hallazgo de 03-spacing.)

## Schema — campos `extra`

```json
"extra": {
  "rol": "card-reposo",
  "valores": [
    { "shadow": "0 1px 2px rgb(0 0 0 / 0.06)", "usos": 11, "pantallas": ["usuarios", "llegadas"] },
    { "shadow": "0 2px 8px rgb(30 64 175 / 0.15)", "usos": 4, "pantallas": ["publicacion"] }
  ],
  "token_propuesto": "shadow-card"
}
```

## Ejemplo de hallazgo bien formado

```json
{
  "id": "SOM-002",
  "titulo": "Cards de KPI con sombra neutra en unas pantallas y tintada de marca en otras",
  "severidad": "riesgo",
  "ubicaciones": [
    { "pantalla": "usuarios", "archivo": "src/pages/usuarios/Kpis.tsx", "linea": 12 },
    { "pantalla": "publicacion", "archivo": "src/pages/publicacion/Kpis.tsx", "linea": 17 }
  ],
  "descripcion": "El mismo componente visual (card de KPI en reposo) usa sombra negra al 6% en dos pantallas y una sombra azul de marca al 15% en otra — la elevación se lee distinta al navegar.",
  "evidencia": "box-shadow computado: usuarios/llegadas '0 1px 2px rgb(0 0 0/.06)' (11 usos), publicacion '0 2px 8px rgb(30 64 175/.15)' (4 usos)",
  "recomendacion": "Token shadow-card neutro para reposo y migrar los 15 usos; si se quiere acento de marca, definirlo como variante explícita, no por pantalla",
  "extra": { "rol": "card-reposo", "valores": [ { "shadow": "0 1px 2px rgb(0 0 0 / 0.06)", "usos": 11, "pantallas": ["usuarios", "llegadas"] }, { "shadow": "0 2px 8px rgb(30 64 175 / 0.15)", "usos": 4, "pantallas": ["publicacion"] } ], "token_propuesto": "shadow-card" }
}
```
