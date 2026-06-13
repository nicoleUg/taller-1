import { describe, it, expect } from 'vitest';
import { getRiesgoTasaInteres } from '../../lib/creditUtils';
import { calcularSeguroDesgravamen } from '../../lib/creditUtils';

describe('getRiesgoTasaInteres', () => {
  it('debe retornar la tasa de interes correcta segun el nivel de riesgo', () => {
    expect(getRiesgoTasaInteres('salvo')).toBe(12);
    expect(getRiesgoTasaInteres('advertencia')).toBe(15);
    expect(getRiesgoTasaInteres('peligro')).toBe(20);
  });
});

describe('calcularSeguroDesgravamen', () => {
  it('debe calcular el 0.15% del monto total para el seguro', () => {
    expect(calcularSeguroDesgravamen(10000)).toBe(15);
  });
});