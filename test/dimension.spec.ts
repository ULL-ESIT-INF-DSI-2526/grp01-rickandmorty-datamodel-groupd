import { describe, test, expect } from 'vitest';
import { Dimension } from '../src/models/dimension';
import { Nivel } from '../src/models/niveles';
import { EstadoDimensiones } from '../src/models/tipos';

describe('Test para comprobar el comportamiento basico de la clase Dimension', () => {
  test('Permite crear de manera correcta una Dimension', () => {
    const dim1 = new Dimension(
      'C-137',
      'Cronenberg',
      EstadoDimensiones.Activa,
      new Nivel(9.4),
      'Especies',
    );
    expect(dim1.info()).toEqual(
      '[C-137] Cronenberg esta Activa y dispone de un nivel de tecnología de: 9.4.\nMás información: Especies',
    );
  });
});
