import { describe, test, expect } from 'vitest';
import { Dimension } from '../../src/models/classes/dimension';
import { Nivel } from '../../src/models/niveles';
import { EstadoDimensiones } from '../../src/models/tipos';

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

  test('Da error en el caso de que se intente crear un objeto con un id que ya esta en array global', () => {
    expect(() => {
      new Dimension(
        'C-137',
        'Error',
        EstadoDimensiones.Cuarentena,
        new Nivel(2.3),
        'Repetido',
      );
    }).toThrow('Este id (C-137) ya ha sido registrado');
  });

  test('Da error en el caso de que el formato del id no sea el valido', () => {
    expect(() => {
      new Dimension(
        'invalido',
        'Intento1',
        EstadoDimensiones.Destruida,
        new Nivel(5.6),
        'Esta dimensión no es valida',
      );
    }).toThrow('Este id (invalido) tiene un formato invalido');
  });
});
