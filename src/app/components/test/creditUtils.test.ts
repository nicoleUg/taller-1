import { describe, it, expect } from 'vitest';
import { getRiesgoTasaInteres } from '../../lib/creditUtils';
import { calcularSeguroDesgravamen } from '../../lib/creditUtils';

const TASA_SALVO = 12;
const TASA_ADVERTENCIA = 15;
const TASA_PELIGRO = 20;

const MONTO_PRUEBA = 10000;
const SEGURO_ESPERADO = 15;

describe('getRiesgoTasaInteres', () => {
  it('debe retornar la tasa de interes correcta segun el nivel de riesgo', () => {
    expect(getRiesgoTasaInteres('salvo')).toBe(TASA_SALVO);
    expect(getRiesgoTasaInteres('advertencia')).toBe(TASA_ADVERTENCIA);
    expect(getRiesgoTasaInteres('peligro')).toBe(TASA_PELIGRO);
  });
});

describe('calcularSeguroDesgravamen', () => {
  it('debe calcular el 0.15% del monto total para el seguro', () => {
    expect(calcularSeguroDesgravamen(MONTO_PRUEBA)).toBe(SEGURO_ESPERADO);
  });
});