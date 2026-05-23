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

    // Buscar inputs
    const inputs = screen.getAllByRole('spinbutton');
    const totalGanadoInput = inputs[0]; // Total Ganado
    const cuotaInput = inputs[1]; // Cuota Solicitada

    // Ingresar Total Ganado = 10000 Bs
    fireEvent.change(totalGanadoInput, { target: { value: '10000' } });
    
    // Ingresar Cuota = 2000 Bs (El líquido pagable será 10000 - 1271 = 8729 Bs. 2000 / 8729 = 22.9%)
    fireEvent.change(cuotaInput, { target: { value: '2000' } });

    // Verificar que el líquido pagable se calcula correctamente
    expect(screen.getByText('8729.00 Bs')).toBeInTheDocument();

    // Verificar que el estado es "safe"
    expect(screen.getByText('Capacidad de Pago Aprobada')).toBeInTheDocument();
    
    // Verificar que el porcentaje de endeudamiento es aproximadamente 22.9%
    expect(screen.getByText('22.9% Endeudamiento')).toBeInTheDocument();
  });
});
