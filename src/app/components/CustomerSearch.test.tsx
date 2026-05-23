import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CustomerSearch } from './CustomerSearch';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import { supabase } from '../lib/supabase';

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn()
    }))
  }
}));

describe('CustomerSearch - Business Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
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
    // Mock successful Supabase response
    const mockQuery = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({
        data: { nombre_completo: 'Juan Pérez Tórrez', historial_crediticio: 'A (Excelente)' },
        error: null
      })
    };
    (supabase.from as any).mockReturnValue(mockQuery);

    render(<CustomerSearch />);

    const ciInput = screen.getByPlaceholderText('Ej: 1234567');
    fireEvent.change(ciInput, { target: { value: '1234567' } });

    const verifyButton = screen.getByRole('button', { name: /Verificar/i });
    fireEvent.click(verifyButton);

    await waitFor(() => {
      expect(screen.getByText('Cliente Encontrado')).toBeInTheDocument();
    });
    
    expect(screen.getByText(/Juan Pérez Tórrez/i)).toBeInTheDocument();
  });

  /**
   * HU-03: Cliente Nuevo
   * Criterio de Aceptación:
   * - Al no encontrar un cliente en el sistema, indicar "Cliente Nuevo".
   */
  it('Debe mostrar "Cliente Nuevo" cuando la búsqueda no retorna resultados', async () => {
    // Mock empty Supabase response
    const mockQuery = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({
        data: null,
        error: null
      })
    };
    (supabase.from as any).mockReturnValue(mockQuery);

    render(<CustomerSearch />);

    const ciInput = screen.getByPlaceholderText('Ej: 1234567');
    fireEvent.change(ciInput, { target: { value: '111111' } });

    const verifyButton = screen.getByRole('button', { name: /Verificar/i });
    fireEvent.click(verifyButton);

    await waitFor(() => {
      expect(screen.getByText('Cliente Nuevo')).toBeInTheDocument();
    });
    
    expect(screen.getByText(/Este C.I. no está registrado en el sistema/i)).toBeInTheDocument();
  });
});
