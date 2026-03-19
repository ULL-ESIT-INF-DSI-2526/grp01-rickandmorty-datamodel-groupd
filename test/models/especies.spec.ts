import { describe, test, expect } from 'vitest';
import { Nivel } from '../../src/models/niveles';
import { EstadoDimensiones, TipoEspecies } from '../../src/models/tipos';
import { Dimension } from '../../src/models/classes/dimension';
import { Especies } from '../../src/models/classes/especie';

describe('Tests para comprobar el funcionamiento de la clase Especie', () => {
  const dim1 = new Dimension(
    'C-137',
    'Cronenberg',
    EstadoDimensiones.Activa,
    new Nivel(9.4),
    'Especies',
  );
  test('Se puede crear un objeto especie sin errores', () => {
    const esp1 = new Especies(
      'E-14',
      'Ratadragones',
      'Lanza fuego',
      dim1,
      TipoEspecies.Amorfo,
      3,
    );
    expect(esp1.info()).toEqual(
      '[E-14] Ratadragones es originaria de Cronenberg es de tipo Amorfo.\nTiene una esperanza de vida media de 3 años humanos.\nMás información: Lanza fuego',
    );
  });

  test('Da error en el caso de que se intente añadir una id que ya existe', () => {
    expect(() => {
      new Especies(
        'E-14',
        'Pajaro mecánico',
        'Vuela',
        dim1,
        TipoEspecies.Robotico,
        15,
      );
    }).toThrow('Este id (E-14) ya ha sido registrado');
  });
});
