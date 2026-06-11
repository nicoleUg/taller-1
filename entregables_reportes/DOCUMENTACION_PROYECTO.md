# Documentación del Proyecto - Evaluación Continua 2

Esta carpeta (`entregables_reportes/`) consolida todos los reportes y evidencias del trabajo realizado sobre el proyecto Frontend para garantizar la calidad del software.

## 1. Resumen de Pruebas Unitarias y Commits

A lo largo del desarrollo se integró la herramienta **Vitest con v8 (Istanbul)** y la librería de **Testing Library** para validar el comportamiento de los componentes de negocio sin tocar componentes de interfaz puros (`ui/`).

Se lograron implementar un total de **12 pruebas unitarias** registradas paso a paso mediante los siguientes **Commits Funcionales** (*Conventional Commits*):

1. `test(frontend): configurar vitest y generar reporte inicial de cobertura al 0%`
   - Configuración inicial de las herramientas. Reporte estático de 0% generado como base de comparación.
2. `test(frontend): agregar pruebas para calculo de capacidad de pago e identificar estado de riesgo`
   - **Prueba 1:** Valida el cálculo automático del descuento de la Gestora (AFP).
   - **Prueba 2:** Valida que el sistema marque riesgo medio cuando el ratio de endeudamiento supera el 30%.
   - **Prueba 3:** Verifica que se detecte alto riesgo y se deshabilite el progreso si supera el 40%.
3. `test(frontend): agregar pruebas para busqueda de clientes y validacion de formulario`
   - **Prueba 4:** Asegura que el botón de verificar esté bloqueado si no hay datos.
   - **Prueba 5:** Verifica mediante simulación del entorno y avance temporal que muestre un Cliente Encontrado si la probabilidad es favorable.
   - **Prueba 6:** Valida el flujo contrario cuando la respuesta es Cliente No Encontrado.
4. `test(frontend): agregar pruebas para validacion de limites y aprobacion de credito`
   - **Prueba 7:** Deshabilita la aprobación si el monto a desembolsar es <= 0.
   - **Prueba 8:** Permite la Aprobación Directa si el monto no excede los $20,000 USD.
   - **Prueba 9:** Fuerza la "Derivación a Comité" bloqueando el éxito directo si el monto excede los $20,000 USD.
5. `test(frontend): agregar pruebas de casos limite completando el set de 12`
   - **Prueba 10:** Caso extremo borrando un input numérico para que el estado vuelva a reposo de forma segura.
   - **Prueba 11:** Caso del umbral exacto ($20,000 USD), asegurando que se apruebe sin comité.
   - **Prueba 12:** Verificación dinámica de la anulación del botón de derivar si un monto superior se borra manualmente.

## 2. Incremento de Cobertura de Código

Gracias a la integración de las 12 pruebas, la cobertura de los tres componentes de la capa de lógica empresarial se incrementó significativamente:
- **Estado Inicial:** 0% General.
- **Estado Final:** `91.54%` General.
  - *CapacityCalculator:* 100%
  - *CustomerSearch:* 94.73%
  - *LoanApproval:* 66.66%



---

## 3. Resolución de Code Smells (Análisis Estático)

Tras cumplir la meta de cobertura, utilizamos **ESLint 9 (Flat Config)** para identificar defectos estructurales o de malas prácticas de programación (*Code Smells*). 

A partir del reporte de diagnóstico, solucionamos los siguientes *Warnings* en distintas áreas, abarcando 5 tipos de malas prácticas:

### A. Magic Numbers (`no-magic-numbers`)
Se extrajeron los valores estáticos "sueltos" en el código a variables constantes y descriptivas para su fácil configuración futura:
- `3000` extraído a `APPROVAL_DELAY_MS` en `LoanApproval.tsx`.
- `1500` extraído a `SEARCH_DELAY_MS` en `CustomerSearch.tsx`.
- `0.3` extraído a `FOUND_PROBABILITY` en `CustomerSearch.tsx`.

### B. Nested Ternary Expressions (`no-nested-ternary`)
Los ternarios anidados dificultan enormemente la lectura. Refactorizamos estos casos:
- En `LoanApproval.tsx`, el `className` del botón usaba ternarios dobles. Se extrajo a la función auxiliar estricta `getButtonClasses(isDisabled, isCommittee)`.
- En `CapacityCalculator.tsx`, la aserción de colores se extrajo a una función declarativa `getTextColorClass()` con estructura `switch`.

### C. Dead Code (`@typescript-eslint/no-unused-vars`)
Importaciones que fueron dejadas ahí a causa de iteraciones previas fueron removidas:
- `AlertTriangle` y `CheckCircle2` de `lucide-react` en `CapacityCalculator.tsx`.

### D. High Cyclomatic Complexity (`complexity`)
Reducción de complejidad y anidación algorítmica:
- Refactorizamos el hook `useEffect` de `CapacityCalculator.tsx` para usar **Early Returns** (Cláusulas de guarda). En vez de usar profundos bloques `if/else`, validamos los errores primero y retornamos prematuramente. Esto redujo el peso cognitivo drásticamente.

### E. Long Method / Función demasiado extensa (`max-lines-per-function`)
Los componentes funcionales de React no deberían de actuar como monolitos para ser fáciles de probar y renderizar.
- En `CustomerSearch.tsx`, se abstrajo gran parte del JSX de validación extrayendo los pequeños subcomponentes visuales `<CustomerFoundResult />` y `<CustomerNotFoundResult />`. Esto redujo el tamaño de la función principal haciéndola más fácil de dar mantenimiento.

> 