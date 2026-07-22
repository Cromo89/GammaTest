# Metodología 04 — Auditoría de Tipografía

Requiere código fuente: se inventarían los valores reales de font-size/weight/line-height (clases y CSS), no lo que aparente una captura.

## Procedimiento

1. **Inventariar:** grep de todos los font-size en uso (clases de utilidad, CSS custom, estilos inline) con conteo de usos y ubicaciones.
2. **Clusterizar por cercanía:** valores a ≤1.5px de distancia usados para el mismo tipo de contenido son un mismo **rol** accidentalmente fragmentado (ej. 10.5/11/11.5px → un solo rol "meta").
3. **Detectar componentes disfrazados:** una combinación repetida de tamaño+peso+tracking+color (ej. un "eyebrow" uppercase) que aparece en muchos lugares como clases sueltas es un componente sin extraer, no solo un token faltante.
4. **Proponer escala semántica** a partir de los clusters (ej. caption/meta/support/body/emphasis/title) — nombres por rol, no por tamaño.
5. **Emitir hallazgos**: un hallazgo por cluster (con todos sus usos), no uno por archivo.

## Criterios de detección

| Regla | Hallazgo si… | Ruido aceptable |
|---|---|---|
| Proliferación de tamaños | Más de ~7 font-size distintos en producto, o valores fraccionales sueltos (10.5px) | Escala nombrada aunque sea amplia |
| Cluster sin rol | ≥2 valores a ≤1.5px usados para el mismo tipo de contenido | Valores cercanos con roles genuinamente distintos y consistentes |
| Componente disfrazado | Misma combinación tipográfica repetida ≥10 veces como clases sueltas | Repeticiones ya encapsuladas en un componente |
| Jerarquía invertida | Un texto de menor jerarquía renderiza más grande/pesado que su título en la misma superficie | — |
| Riesgo de merge de clases | El proyecto define tokens de tamaño custom Y usa una función de merge (tailwind-merge) sin registrar el grupo — el tamaño puede descartarse en runtime | Proyectos sin merge de clases o con el grupo registrado |

## Severidad

`critico`: jerarquía invertida o texto ilegible (<10px en contenido). `riesgo`: clusters fragmentados visibles entre pantallas, componente disfrazado en superficies principales, riesgo de merge de clases activo. `atencion`: proliferación sin síntoma visible aún.

## Schema — campos `extra`

```json
"extra": {
  "cluster": { "valores": ["10.5px", "11px", "11.5px"], "usos": 34, "rol_propuesto": "meta" },
  "escala_propuesta": { "caption": "10px", "meta": "11px", "support": "12px", "body": "14px", "emphasis": "16px", "title": "20px" },
  "componente_candidato": null
}
```

`escala_propuesta` solo en el hallazgo de escala (uno por corrida). `componente_candidato` (nombre sugerido + conteo de usos) solo cuando la regla de componente disfrazado aplica.

## Ejemplos de hallazgo bien formado

```json
{
  "id": "TIP-002",
  "titulo": "Tres tamaños fraccionales para el mismo rol de texto meta",
  "severidad": "riesgo",
  "ubicaciones": [
    { "pantalla": "usuarios", "archivo": "src/pages/usuarios/Tabla.tsx", "linea": 63 },
    { "pantalla": "llegadas", "archivo": "src/pages/llegadas/Cards.tsx", "linea": 29 }
  ],
  "descripcion": "Los textos secundarios bajo títulos de card y en celdas de detalle usan 10.5px, 11px y 11.5px indistintamente — es un solo rol fragmentado en tres valores.",
  "evidencia": "grep font-size: 10.5px (8 usos), 11px (19), 11.5px (7), todos en texto meta/secundario",
  "recomendacion": "Token text-meta=11px en el sistema existente y migrar los 34 usos en un lote",
  "extra": { "cluster": { "valores": ["10.5px", "11px", "11.5px"], "usos": 34, "rol_propuesto": "meta" }, "escala_propuesta": null, "componente_candidato": null }
}
```

```json
{
  "id": "TIP-004",
  "titulo": "Eyebrow uppercase repetido 23 veces como clases sueltas",
  "severidad": "riesgo",
  "ubicaciones": [{ "pantalla": "varias", "archivo": "src/pages/**", "linea": null }],
  "descripcion": "La combinación 11px + semibold + uppercase + tracking amplio + color secundario aparece 23 veces escrita a mano — es un componente ('Eyebrow') disfrazado de texto suelto, no un token faltante.",
  "evidencia": "grep de la combinación de clases: 23 ocurrencias en 9 archivos, con 3 variaciones accidentales de tracking",
  "recomendacion": "Crear componente Eyebrow en shared/ui y migrar las 23 ocurrencias — no solo aplicar un token de tamaño",
  "extra": { "cluster": null, "escala_propuesta": null, "componente_candidato": { "nombre": "Eyebrow", "usos": 23 } }
}
```
