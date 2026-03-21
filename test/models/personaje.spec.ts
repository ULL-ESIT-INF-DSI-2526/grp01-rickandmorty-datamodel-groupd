import { describe, test, expect } from 'vitest';
import { Nivel } from '../../src/models/niveles';
import {
  AfilaicionPersonajes,
  EstadoDimensiones,
  EstadoPersonajes,
  TipoEspecies,
} from '../../src/models/tipos';
import { Personaje } from '../../src/models/classes/personajes';
import { Dimension } from '../../src/models/classes/dimension';
import { Especies } from '../../src/models/classes/especie';

describe('Test para comprobar el funcionamiento de la clase Personaje', () => {
  const dim1 = new Dimension(
    'C-137',
    'Cronenberg',
    EstadoDimensiones.Activa,
    new Nivel(9.4),
    'Especies',
  );

  const esp1 = new Especies(
    'E-12',
    'Humano',
    '',
    dim1,
    TipoEspecies.Humanoide,
    80,
  );

  describe('Permite crear un personaje sin inconvenintes', () => {
    const personaje1 = new Personaje(
      '1234',
      'Morty',
      esp1,
      dim1,
      EstadoPersonajes.Vivo,
      AfilaicionPersonajes.FedGalactica,
      new Nivel(8.9),
      '',
    );

    test('Id', () => {
      expect(personaje1.id).toEqual('1234');
    });
    test('Nombre', () => {
      expect(personaje1.nombre).toEqual('Morty');
    });
    test('Especie', () => {
      expect(personaje1.especie).toEqual(esp1);
    });
    test('Dimensión', () => {
      expect(personaje1.dim_origen).toEqual(dim1);
    });
    test('Estado', () => {
      expect(personaje1.estado).toEqual('Vivo');
    });
    test('Afiliación', () => {
      expect(personaje1.afiliacion).toEqual('Federación Galáctica');
    });
    test('Nivel de Inteligencia', () => {
      expect(personaje1.nivel_inteligencia.nivel).toEqual(8.9);
    });
    test('Descripcion', () => {
      expect(personaje1.descripcion).toEqual('');
    });

    expect(personaje1.info()).toEqual(
      '[1234] Morty esta Vivo y es de Cronenberg.\nSu especie es Humano y está afiliado a Federación Galáctica.\nDispone de un nivel de inteligencia de 8.9\nMás información: ',
    );
  });

  test('Da error al intentar crear un objeto con el mismo id que otro de la lista', () => {
    expect(() => {
      new Personaje(
        '1234',
        'Rick',
        esp1,
        dim1,
        EstadoPersonajes.Muerto,
        AfilaicionPersonajes.Independiente,
        new Nivel(3.9),
        '',
      );
    }).toThrow('Este id (1234) ya ha sido registrado');
  });
});
