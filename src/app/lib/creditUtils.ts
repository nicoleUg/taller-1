export type nivelRiesgo = 'salvo' | 'advertencia' | 'peligro';

const TARIFAS_POR_RIESGO: Record<nivelRiesgo, number> = {
  salvo: 12,
  advertencia: 15,
  peligro: 20
};

export function getRiesgoTasaInteres(riesgo: nivelRiesgo): number {
  return TARIFAS_POR_RIESGO[riesgo] || 20;
}

const seguroDesgravamen = 0.0015;

export function calcularSeguroDesgravamen(monto: number): number {
  if (monto <= 0) return 0;
  return monto * seguroDesgravamen;
}
