import { describe, test, expect } from 'vitest';
import { Dimension } from '../../src/models/classes/dimension';
import { Nivel } from '../../src/models/niveles';
import { EstadoDimensiones, TipoLocalizaciones } from '../../src/models/tipos';
import { Localizacion } from '../../src/models/classes/localizaciones';

describe('Test para comprobar el funcionamiento de la clase Localizacion', () => {
  const dim1 = new Dimension(
    'C-137',
    'Cronenberg',
    EstadoDimensiones.Activa,
    new Nivel(9.4),
    'Especies',
  );

  describe('Se puede crear un objeto sin errores', () => {
    const loc1 = new Localizacion(
      '12345',
      'Sector 7-G',
      TipoLocalizaciones.DimensionBolsillo,
      dim1,
      24000,
      'Contiene gases toxicos',
    );

    test('Id', () => {
      expect(loc1.id).toEqual('12345');
    });
    test('Nombre', () => {
      expect(loc1.nombre).toEqual('Sector 7-G');
    });
    test('Tipo', () => {
      expect(loc1.tipo).toEqual('Dimensión de bolsillo');
    });
    test('Dimensión', () => {
      expect(loc1.dimension).toEqual(dim1);
    });
    test('Población', () => {
      expect(loc1.poblacion_aprox).toEqual(24000);
    });
    test('Descripción', () => {
      expect(loc1.descripcion).toEqual('Contiene gases toxicos');
    });
    expect(loc1.info()).toEqual(
      '[12345] Sector 7-G esta en la dimensión Cronenberg.\nEs de tipo Dimensión de bolsillo y tiene una población aproximada de 24000.\nMás información: Contiene gases toxicos',
    );
  });

  test('Da error en caso de que el id a intorducir ya este en el set global', () => {
    expect(() => {
      new Localizacion(
        '12345',
        'Alternativa',
        TipoLocalizaciones.EstacionEspacial,
        dim1,
        35678,
        'Solo es habitada por ratas',
      );
    }).toThrow('Este id (12345) ya ha sido registrado');
  });
});
