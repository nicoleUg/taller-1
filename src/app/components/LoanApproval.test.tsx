import { render, screen, fireEvent } from '@testing-library/react';
import { LoanApproval } from './LoanApproval';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('LoanApproval - Business Logic', () => {
  /**
   * Prueba 7
   * HU-05: Validación de Monto
   * Criterio de Aceptación:
   * - El botón de acción debe estar deshabilitado si el monto a desembolsar es vacío o menor/igual a cero.
   */
  it('Debe mantener el botón deshabilitado si el monto es vacío o cero', () => {
    render(<LoanApproval />);

    const actionButton = screen.getByRole('button');
    expect(actionButton).toBeDisabled();

    const amountInput = screen.getByPlaceholderText('0.00');
    fireEvent.change(amountInput, { target: { value: '0' } });

    expect(actionButton).toBeDisabled();
  });

  /**
   * Prueba 8
   * HU-06: Aprobación Directa
   * Criterio de Aceptación:
   * - Si el monto es menor o igual a 20,000 USD, debe mostrar la opción de "Aprobar Crédito".
   */
  it('Debe mostrar la opción de "Aprobar Crédito" para montos <= 20000', () => {
    render(<LoanApproval />);

    const amountInput = screen.getByPlaceholderText('0.00');
    fireEvent.change(amountInput, { target: { value: '15000' } });

    const actionButton = screen.getByRole('button');
    expect(actionButton).not.toBeDisabled();
    expect(screen.getByText('Aprobar Crédito')).toBeInTheDocument();

    expect(screen.queryByText(/Monto excede el límite de autonomía/i)).not.toBeInTheDocument();
  });

  /**
   * Prueba 9
   * HU-07: Derivación a Comité
   * Criterio de Aceptación:
   * - Si el monto supera los 20,000 USD, debe alertar que excede el límite y cambiar la opción a "Derivar a Comité".
   */
  it('Debe mostrar "Derivar a Comité" y alerta para montos > 20000', () => {
    render(<LoanApproval />);

    const amountInput = screen.getByPlaceholderText('0.00');
    fireEvent.change(amountInput, { target: { value: '25000' } });

    const actionButton = screen.getByRole('button');
    expect(actionButton).not.toBeDisabled();
    expect(screen.getByText('Derivar a Comité')).toBeInTheDocument();

    expect(screen.getByText(/Monto excede el límite de autonomía/i)).toBeInTheDocument();
  });
});
