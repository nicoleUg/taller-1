# 🚀 Reporte de Evaluación Continua 2 (EC2)
**Estudiante:** [Tu Apellido y Nombre]

---

## 1. Cobertura de Pruebas Unitarias (Frontend)
Se configuró **Vitest** con cobertura usando **v8** para generar los reportes de nuestro código.

- **Cobertura Inicial (Antes):** `0%` (Ninguna prueba implementada, comprobado con el reporte 1)
- **Cobertura Final (Después):** `91.5%` (Reporte 2 generado)
  - `CapacityCalculator.tsx`: **100%** de Statements
  - `CustomerSearch.tsx`: **94.7%** de Statements
  - `LoanApproval.tsx`: **66.6%** de Statements

Se crearon un total de **12 pruebas unitarias**, validando la lógica de negocio, límites de aprobación, validación de inputs y manejo de la probabilidad de clientes encontrados.

---

## 2. Refactorización y Code Smells (ESLint)
Se utilizó **ESLint 9 (Flat Config)** para identificar y corregir defectos estructurales en el código (*Code Smells*). Se redujeron exitosamente los reportes mediante los siguientes ajustes:

| Componente | Tipo de Code Smell | Corrección Aplicada |
| :--- | :--- | :--- |
| `CapacityCalculator` | **Dead Code** (`@typescript-eslint/no-unused-vars`) | Se eliminaron variables e importaciones sin usar (`AlertTriangle`, `CheckCircle2`). |
| `LoanApproval` | **Magic Numbers** (`no-magic-numbers`) | Se extrajo el valor numérico `3000` a una constante semántica `APPROVAL_DELAY_MS`. |
| `CustomerSearch` | **Magic Numbers** (`no-magic-numbers`) | Se extrajeron los valores `0.3` y `1500` a `FOUND_PROBABILITY` y `SEARCH_DELAY_MS`. |
| `LoanApproval` | **Nested Ternary** (`no-nested-ternary`) | Se abstrajo la lógica condicional anidada para definir el color del botón en una función auxiliar `getButtonClasses()`. |
| `CapacityCalculator` | **Nested Ternary** (`no-nested-ternary`) | Se reemplazó el ternario anidado de estado de colores por una función con `switch-case` (`getTextColorClass`). |
| `CapacityCalculator` | **High Complexity** (`complexity`) | Se modificó el `useEffect` reemplazando los grandes bloques `if/else` por *early returns* (retornos anticipados) para facilitar la lectura. |
| `CustomerSearch` | **Long Method** (`max-lines-per-function`) | Se extrajo la gran cantidad de código JSX del bloque `return` hacia funciones componentes más pequeñas (`CustomerFoundResult` y `CustomerNotFoundResult`). |

> Todos los reportes estáticos HTML (`eslint-reporte-antes.html` y `eslint-reporte-despues.html`) han sido generados y depositados en la carpeta `/reports`.

---
*Con esto, todos los criterios de la Evaluación Continua 2 quedan verificados y testeados correctamente de acuerdo a las rúbricas establecidas.*
