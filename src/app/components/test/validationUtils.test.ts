import { describe, it, expect } from 'vitest';
import { EsCIValido } from '../../../lib/validationUtils';

describe('EsCIValido', () => {
  it('debe aceptar carnets validos con o sin complemento', () => {
    expect(EsCIValido("1234567")).toBe(true);
    expect(EsCIValido("9876543-1A")).toBe(true);
  });

  it('debe rechazar carnets con letras al inicio o longitudes incorrectas', () => {
    expect(EsCIValido("ABC1234")).toBe(false); 
    expect(EsCIValido("12345")).toBe(false);  
  });
});