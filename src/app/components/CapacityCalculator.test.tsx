import { render, screen, fireEvent } from '@testing-library/react';
import { CapacityCalculator } from './CapacityCalculator';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

/**
 * HU-01: Cálculo de Capacidad de Pago
 * Criterio de Aceptación:
 * - Si el porcentaje de endeudamiento es menor al 30%, el estado debe ser "Capacidad de Pago Aprobada" (Seguro).
 */
describe('CapacityCalculator - Business Logic', () => {
  it('Debe calcular el descuento AFP y mostrar estado Seguro (<30%)', () => {
    render(<CapacityCalculator />);

    const inputs = screen.getAllByRole('spinbutton');
    const totalGanadoInput = inputs[0];
    const cuotaInput = inputs[1];

    fireEvent.change(totalGanadoInput, { target: { value: '10000' } });

    fireEvent.change(cuotaInput, { target: { value: '2000' } });

    expect(screen.getByText('8729.00 Bs')).toBeInTheDocument();

    expect(screen.getByText('Capacidad de Pago Aprobada')).toBeInTheDocument();

    expect(screen.getByText('22.9% Endeudamiento')).toBeInTheDocument();
  });

  /**
   * HU-01: Cálculo de Capacidad de Pago
   * Criterio de Aceptación:
   * - Si el porcentaje de endeudamiento está entre 30% y 40%, el estado debe ser "Capacidad Limitada - Requiere Revisión" (Alerta).
   */
  it('Debe mostrar estado de Alerta (30%-40%)', () => {
    render(<CapacityCalculator />);

    const inputs = screen.getAllByRole('spinbutton');
    const totalGanadoInput = inputs[0];
    const cuotaInput = inputs[1];

    fireEvent.change(totalGanadoInput, { target: { value: '10000' } });

    fireEvent.change(cuotaInput, { target: { value: '3000' } });

    expect(screen.getByText('Capacidad Limitada - Requiere Revisión')).toBeInTheDocument();
    expect(screen.getByText('34.4% Endeudamiento')).toBeInTheDocument();
  });

  /**
   * HU-01: Cálculo de Capacidad de Pago
   * Criterio de Aceptación:
   * - Si el porcentaje de endeudamiento supera el 40%, el estado debe ser "Alto Riesgo - Rechazado Automáticamente" (Peligro).
   */
  it('Debe mostrar estado de Peligro (>40%)', () => {
    render(<CapacityCalculator />);

    const inputs = screen.getAllByRole('spinbutton');
    const totalGanadoInput = inputs[0];
    const cuotaInput = inputs[1];

    fireEvent.change(totalGanadoInput, { target: { value: '10000' } });

    fireEvent.change(cuotaInput, { target: { value: '4000' } });

    expect(screen.getByText('Alto Riesgo - Rechazado Automáticamente')).toBeInTheDocument();
    expect(screen.getByText('45.8% Endeudamiento')).toBeInTheDocument();
  });
});
