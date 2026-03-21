import { describe, test, expect } from 'vitest';
import { Personaje } from '../../src/models/classes/personajes';
import { Artefacto } from '../../src/models/classes/artefactos';
import { Dimension } from '../../src/models/classes/dimension';
import { Especies } from '../../src/models/classes/especie';
import { Nivel } from '../../src/models/niveles';
import {
  EstadoDimensiones,
  EstadoPersonajes,
  AfilaicionPersonajes,
  TipoEspecies,
  TipoArtefacto,
} from '../../src/models/tipos';

describe('Test para comprobar el funcionamiento de la clase Artefacto', () => {
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

  describe('Se puede instanciar un objeto sin problemas', () => {
    const art1 = new Artefacto(
      'I-345',
      'Megasiembra',
      personaje1,
      TipoArtefacto.Biotecnologia,
      new Nivel(6.7),
      'Ayuda a los agicultores galacticos',
    );
    test('Id', () => {
      expect(art1.id).toEqual('I-345');
    });
    test('Nombre', () => {
      expect(art1.nombre).toEqual('Megasiembra');
    });
    test('Inventor', () => {
      expect(art1.inventor).toEqual(personaje1);
    });
    test('Tipo', () => {
      expect(art1.tipo).toEqual('Biotecnología');
    });
    test('Nivel de peligrosidad', () => {
      expect(art1.nivel_peligrosidad.nivel).toEqual(6.7);
    });
    test('Descripción', () => {
      expect(art1.descripcion).toEqual('Ayuda a los agicultores galacticos');
    });

    expect(art1.info()).toEqual(
      '[I-345] Megasiembra fue inventado por Morty.\nEs de tipo Biotecnología y tiene un nivel de peligrosidad de 6.7.\nMás información: Ayuda a los agicultores galacticos',
    );
  });

  test('Da error en caso de que intente crearse un objeto con el mismo id que uno que ya existe', () => {
    expect(() => {
      new Artefacto(
        'I-345',
        'Glock',
        personaje1,
        TipoArtefacto.Arma,
        new Nivel(9.5),
        'Usa balas humanas',
      );
    }).toThrow('Este id (I-345) ya ha sido registrado');
  });
});
