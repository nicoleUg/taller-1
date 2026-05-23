import { render, screen, fireEvent, act } from '@testing-library/react';
import { CustomerSearch } from './CustomerSearch';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';

describe('CustomerSearch - Business Logic', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  /**
   * HU-04: Validación de Búsqueda
   * Criterio de Aceptación:
   * - El botón "Verificar" debe estar deshabilitado si el campo C.I. está vacío.
   */
  it('Debe mantener el botón deshabilitado si el campo CI está vacío', () => {
    render(<CustomerSearch />);

    const verifyButton = screen.getByRole('button', { name: /Verificar/i });
    expect(verifyButton).toBeDisabled();

    const ciInput = screen.getByPlaceholderText('Ej: 1234567');
    fireEvent.change(ciInput, { target: { value: '123456' } });

    expect(verifyButton).not.toBeDisabled();
  });

  /**
   * HU-02: Búsqueda de Cliente Existente
   * Criterio de Aceptación:
   * - Al encontrar un cliente en el sistema, mostrar el panel de "Cliente Encontrado" con su nombre y score.
   */
  it('Debe mostrar "Cliente Encontrado" cuando la búsqueda es exitosa', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9);

    render(<CustomerSearch />);

    const ciInput = screen.getByPlaceholderText('Ej: 1234567');
    fireEvent.change(ciInput, { target: { value: '9876543' } });

    const verifyButton = screen.getByRole('button', { name: /Verificar/i });
    fireEvent.click(verifyButton);

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByText('Cliente Encontrado')).toBeInTheDocument();
    expect(screen.getByText(/Juan Pérez Tórrez/i)).toBeInTheDocument();
  });

  /**
   * HU-03: Cliente Nuevo
   * Criterio de Aceptación:
   * - Al no encontrar un cliente en el sistema, indicar "Cliente Nuevo".
   */
  it('Debe mostrar "Cliente Nuevo" cuando la búsqueda no retorna resultados', async () => {
    // Forzamos Math.random para que sea menor o igual a 0.3 (ej. 0.1)
    vi.spyOn(Math, 'random').mockReturnValue(0.1);

    render(<CustomerSearch />);

    const ciInput = screen.getByPlaceholderText('Ej: 1234567');
    fireEvent.change(ciInput, { target: { value: '111111' } });

    const verifyButton = screen.getByRole('button', { name: /Verificar/i });
    fireEvent.click(verifyButton);

    // Avanzar el tiempo 1500ms
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByText('Cliente Nuevo')).toBeInTheDocument();
    expect(screen.getByText(/Este C.I. no está registrado en el sistema/i)).toBeInTheDocument();
  });
});
