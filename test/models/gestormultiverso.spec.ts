import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GestorMultiverso } from '../../src/models/classes/gestormultiverso.js';
import { almacen } from '../../src/data/alamacen.js';
import { Dimension } from '../../src/models/classes/dimension.js';
import {
  EstadoPersonajes,
  EstadoDimensiones,
  TipoArtefacto,
  TipoEspecies,
  AfilaicionPersonajes,
  TipoLocalizaciones,
} from '../../src/models/tipos.js';
import {
  IntDimensiones,
  IntPersonajes,
  IntEspecies,
  IntArtefactos,
  IntLocalizacion,
} from '../../src/models/interfaces.js';
import { Nivel } from '../../src/models/niveles.js';

describe('GestorMultiverso', () => {
  let gestor: GestorMultiverso;
  const mockDim: IntDimensiones = {
    id: 'C-137',
    nombre: 'Tierra C-137',
    estado: EstadoDimensiones.Activa,
    nivel_tec: new Nivel(10),
    descripcion: 'Origen de Rick',
    info: () => 'Texto de prueba',
  };
  const mockEspecie: IntEspecies = {
    id: 'ESP-01',
    nombre: 'Humano',
    descripcion: 'Sapiens',
    origen: mockDim,
    tipo: TipoEspecies.Humanoide,
    esperanza_vida: 80,
    info: () => 'Texto de prueba',
  };
  const mockPersonaje: IntPersonajes = {
    id: 'P-01',
    nombre: 'Rick Sanchez',
    especie: mockEspecie,
    dim_origen: mockDim,
    estado: EstadoPersonajes.Vivo,
    afiliacion: AfilaicionPersonajes.Independiente,
    nivel_inteligencia: new Nivel(10),
    descripcion: 'Científico',
    info: () => 'Texto de prueba',
  };
  const mockLoc: IntLocalizacion = {
    id: 'LOC-01',
    nombre: 'Ciudadela de los Ricks',
    dimension: mockDim,
    tipo: TipoLocalizaciones.Planeta,
    descripcion: 'Sede del Consejo de Ricks',
    poblacion_aprox: 1000,
    info: () => 'Texto de prueba',
  };

  beforeEach(async () => {
    almacen.data = {
      dimensiones: [],
      personajes: [],
      especies: [],
      localizaciones: [],
      artefactos: [],
      regEventos: [],
    };
    vi.spyOn(almacen, 'write').mockResolvedValue(undefined);

    gestor = new GestorMultiverso();
  });

  describe('Gestion de Dimensiones', () => {
    it('añadir dimension', async () => {
      await gestor.addDimension(mockDim);
      expect(gestor.getAllDimensions()).toContainEqual(mockDim);
    });

    it('lanzar error si el ID de dimension ya existe', async () => {
      await gestor.addDimension(mockDim);
      await expect(gestor.addDimension(mockDim)).rejects.toThrow(
        "Error: dimension con ID 'C-137' ya registrada",
      );
    });

    it('eliminar una dimension y actualizar el estado de sus personajes', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      await gestor.removeDimension('C-137');

      const p = gestor.getAllCharacters()[0];
      expect(p.dim_origen.id).toBe('NULL');
      expect(p.estado).toBe(EstadoPersonajes.Desconocido);
    });

    it('lanzar error al eliminar una dimension inexistente', async () => {
      await expect(gestor.removeDimension('ID-FALSO')).rejects.toThrow(
        'Dimension no existente',
      );
    });

    it('actualizar una dimension existente', async () => {
      const dim1 = new Dimension(
        'C-137',
        'Tierra C-137',
        EstadoDimensiones.Activa,
        new Nivel(10),
        'Origen de Rick',
      );
      await gestor.addDimension(dim1);
      const dimActualizada: IntDimensiones = {
        ...mockDim,
        nombre: 'Tierra C-137 Actualizada',
      };
      await gestor.updateDimension('C-137', dimActualizada);

      expect(gestor.getAllDimensions()[0].nombre).toBe(
        'Tierra C-137 Actualizada',
      );
    });

    it('lanzar error al actualizar una dimension inexistente', async () => {
      const dimActualizada: IntDimensiones = {
        ...mockDim,
        nombre: 'Tierra C-137 Actualizada',
      };
      await expect(
        gestor.updateDimension('ID-FALSO', dimActualizada),
      ).rejects.toThrow("La dimension con ID 'ID-FALSO' no existe");
    });

    it('lanzar error al actualizar una dimension con un ID que ya existe', async () => {
      const dim1 = new Dimension(
        'C-120',
        'Tierra C-137',
        EstadoDimensiones.Activa,
        new Nivel(10),
        'Origen de Rick',
      );
      const dim2 = new Dimension(
        'C-131',
        'Tierra C-131',
        EstadoDimensiones.Activa,
        new Nivel(9),
        'Otra dimension',
      );
      await gestor.addDimension(dim1);
      await gestor.addDimension(dim2);

      const dimActualizada: IntDimensiones = {
        ...mockDim,
        id: 'C-131', // ID que ya existe
        nombre: 'Tierra C-137 Actualizada',
      };
      await expect(
        gestor.updateDimension('C-120', dimActualizada),
      ).rejects.toThrow("El nuevo ID 'C-131' ya esta en uso");
    });
  });

  describe('Gestion de Personajes', () => {
    it('añadir personaje', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      expect(gestor.getAllCharacters().length).toBe(1);
    });

    it('lanzar error si el ID de personaje ya existe', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      await expect(gestor.addCharacter(mockPersonaje)).rejects.toThrow(
        "El personaje con ID 'P-01' ya existe",
      );
    });

    it('lanzar error si la dimensión del personaje no esta registrada', async () => {
      await expect(gestor.addCharacter(mockPersonaje)).rejects.toThrow(
        "Error: La dimension 'Destruida' no esta registrada",
      );
    });

    it('debe filtrar personajes por nombre', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      const resultados = gestor.buscarPersonajes({ nombre: 'Rick' });
      expect(resultados[0].nombre).toBe('Rick Sanchez');
    });

    it('debe filtrar personajes por especie', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      const resultados = gestor.buscarPersonajes({ especie: 'Humano' });
      expect(resultados[0].especie.nombre).toBe('Humano');
    });

    it('debe filtrar personajes por afiliación', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      const resultados = gestor.buscarPersonajes({
        afiliacion: 'Independiente',
      });
      expect(resultados[0].afiliacion).toBe('Independiente');
    });

    it('debe filtrar personajes por dimensión de origen', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      const resultados = gestor.buscarPersonajes({
        dim_origen: 'Tierra C-137',
      });
      expect(resultados[0].dim_origen.nombre).toBe('Destruida');
    });

    it('debe retornar un array vacío si no hay coincidencias', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      const resultados = gestor.buscarPersonajes({ nombre: 'Morty' });
      expect(resultados).toEqual([]);
    });

    it('eliminar personaje', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      await gestor.deleteCharacter('P-01');
      expect(gestor.getAllCharacters().length).toBe(0);
    });

    it('lanzar error al eliminar un personaje inexistente', async () => {
      await expect(gestor.deleteCharacter('ID-FALSO')).rejects.toThrow(
        "El personaje con ID 'ID-FALSO' no existe",
      );
    });

    it('actualizar un personaje existente', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      const personajeActualizado: IntPersonajes = {
        ...mockPersonaje,
        nombre: 'Rick Sanchez Actualizado',
      };
      await gestor.updateCharacter('P-01', personajeActualizado);

      expect(gestor.getAllCharacters()[0].nombre).toBe(
        'Rick Sanchez Actualizado',
      );
    });

    it('lanzar error al actualizar un personaje inexistente', async () => {
      const personajeActualizado: IntPersonajes = {
        ...mockPersonaje,
        nombre: 'Rick Sanchez Actualizado',
      };
      await expect(
        gestor.updateCharacter('ID-FALSO', personajeActualizado),
      ).rejects.toThrow("Personaje 'ID-FALSO' no encontrada");
    });

    it('lanzar error al actualizar un personaje con un ID que ya existe', async () => {
      const personaje2: IntPersonajes = {
        ...mockPersonaje,
        id: 'P-02',
        nombre: 'Morty Smith',
      };
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      await gestor.addCharacter(personaje2);

      const personajeActualizado: IntPersonajes = {
        ...mockPersonaje,
        id: 'P-02', // ID que ya existe
        nombre: 'Rick Sanchez Actualizado',
      };
      await expect(
        gestor.updateCharacter('P-01', personajeActualizado),
      ).rejects.toThrow('El nuevo ID de personaje ya esta en uso');
    });
  });

  describe('Gestion de Artefactos', () => {
    const mockArt: IntArtefactos = {
      id: 'A-01',
      nombre: 'Portal Gun',
      inventor: mockPersonaje,
      tipo: TipoArtefacto.DispositivoViaje,
      nivel_peligrosidad: new Nivel(9),
      descripcion: 'Viaje interdimensional',
      info: () => 'Texto de prueba',
    };

    it('añadir artefacto', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      await gestor.addArtifact(mockArt);
      expect(gestor.getAllArtifacts().length).toBe(1);
    });

    it('lanzar error si el ID de artefacto ya existe', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      await gestor.addArtifact(mockArt);
      await expect(gestor.addArtifact(mockArt)).rejects.toThrow(
        "El artefacto con ID 'A-01' ya existe",
      );
    });

    it('dejar aviso en el artefacto si el inventor es eliminado', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      await gestor.addArtifact(mockArt);
      await gestor.deleteCharacter('P-01');

      const art = gestor.getAllArtifacts()[0];
      expect(art.descripcion).toContain(' [AVISO: Inventor eliminado] ');
    });

    it('Buscar artefactos por nombre', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      await gestor.addArtifact(mockArt);

      const resultados = gestor.buscarArtefactos({ nombre: 'Portal' });
      expect(resultados.length).toBe(1);
      expect(resultados[0].nombre).toBe('Portal Gun');
    });

    it('Buscar artefactos por inventor', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      await gestor.addArtifact(mockArt);

      const resultados = gestor.buscarArtefactos({ inventor: 'Rick' });
      expect(resultados.length).toBe(1);
      expect(resultados[0].inventor.nombre).toBe('Rick Sanchez');
    });

    it('Buscar artefactos por tipo', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      await gestor.addArtifact(mockArt);

      const resultados = gestor.buscarArtefactos({
        tipo: TipoArtefacto.DispositivoViaje,
      });
      expect(resultados.length).toBe(1);
      expect(resultados[0].tipo).toBe(TipoArtefacto.DispositivoViaje);
    });

    it('Buscar artefactos por peligrosidad mínima', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      await gestor.addArtifact(mockArt);

      const resultados = gestor.buscarArtefactos({ peligrosidadMinima: 8 });
      expect(resultados.length).toBe(1);
      expect(resultados[0].nombre).toBe('Portal Gun');
    });

    it('Buscar artefactos por peligrosidad exacta', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      await gestor.addArtifact(mockArt);

      const resultados = gestor.buscarArtefactos({ peligrosidad: 9 });
      expect(resultados.length).toBe(1);
      expect(resultados[0].nivel_peligrosidad).toEqual(new Nivel(9));
    });

    it('Buscar artefactos con múltiples filtros combinados', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      await gestor.addArtifact(mockArt);

      const resultados = gestor.buscarArtefactos({
        nombre: 'Portal',
        inventor: 'Rick',
        tipo: TipoArtefacto.DispositivoViaje,
      });
      expect(resultados.length).toBe(1);
      expect(resultados[0].nombre).toBe('Portal Gun');
    });

    it('Retornar array vacío cuando no hay coincidencias en búsqueda de artefactos', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      await gestor.addArtifact(mockArt);

      const resultados = gestor.buscarArtefactos({ nombre: 'NoExiste' });
      expect(resultados).toEqual([]);
    });

    it('Retornar todos los artefactos cuando no se especifican filtros', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      await gestor.addArtifact(mockArt);

      const resultados = gestor.buscarArtefactos({});
      expect(resultados.length).toBe(1);
      expect(resultados).toEqual(gestor.getAllArtifacts());
    });

    it('lanzar error si el inventor del artefacto no esta registrado', async () => {
      await expect(gestor.addArtifact(mockArt)).rejects.toThrow(
        "No se puede añadir: El inventor 'Rick Sanchez' no esta registrado",
      );
    });

    it('eliminar artefacto', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      await gestor.addArtifact(mockArt);
      await gestor.deleteArtifact('A-01');
      expect(gestor.getAllArtifacts().length).toBe(0);
    });

    it('lanzar error al eliminar un artefacto inexistente', async () => {
      await expect(gestor.deleteArtifact('ID-FALSO')).rejects.toThrow(
        'ID no encontrado',
      );
    });

    it('actualizar un artefacto existente', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      await gestor.addArtifact(mockArt);
      const artActualizado: IntArtefactos = {
        ...mockArt,
        nombre: 'Portal Gun Actualizada',
      };
      await gestor.updateArtifact('A-01', artActualizado);

      expect(gestor.getAllArtifacts()[0].nombre).toBe('Portal Gun Actualizada');
    });

    it('lanzar error al actualizar un artefacto inexistente', async () => {
      const artActualizado: IntArtefactos = {
        ...mockArt,
        nombre: 'Portal Gun Actualizada',
      };
      await expect(
        gestor.updateArtifact('ID-FALSO', artActualizado),
      ).rejects.toThrow("Artefacto 'ID-FALSO' no encontrado");
    });

    it('lanzar error al actualizar un artefacto con un ID que ya existe', async () => {
      const art2: IntArtefactos = {
        ...mockArt,
        id: 'A-02',
        nombre: 'Meeseeks Box',
      };
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      await gestor.addArtifact(mockArt);
      await gestor.addArtifact(art2);

      const artActualizado: IntArtefactos = {
        ...mockArt,
        id: 'A-02', // ID que ya existe
        nombre: 'Portal Gun Actualizada',
      };
      await expect(
        gestor.updateArtifact('A-01', artActualizado),
      ).rejects.toThrow('El nuevo ID ya esta en uso por otro artefacto');
    });
  });

  describe('Gestion de Localizaciones', () => {
    it('debe añadir una localizacion si la dimensión existe', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addLocation(mockLoc);
      const locales = gestor.getAllLocations();
      expect(locales.length).toBe(1);
      expect(locales[0].nombre).toBe('Ciudadela de los Ricks');
    });

    it('Error al añadir una localizacion con dimension no registrada', async () => {
      await expect(gestor.addLocation(mockLoc)).rejects.toThrow(
        "Error: La dimension 'Destruida' no existe en el registro",
      );
    });

    it('lanzar error si el ID de localizacion ya existe', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addLocation(mockLoc);
      await expect(gestor.addLocation(mockLoc)).rejects.toThrow(
        "La localizacion con ID 'LOC-01' ya existe.",
      );
    });

    it('lanzar error si la dimension de la localización no esta registrada', async () => {
      await expect(gestor.addLocation(mockLoc)).rejects.toThrow(
        "Error: La dimension 'Destruida' no existe en el registro",
      );
    });

    it('actualizar una localizacion existente', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addLocation(mockLoc);
      const locActualizada: IntLocalizacion = {
        ...mockLoc,
        nombre: 'Ciudadela Destruida',
      };
      await gestor.updateLocation('LOC-01', locActualizada);

      expect(gestor.getAllLocations()[0].nombre).toBe('Ciudadela Destruida');
    });

    it('eliminar localizacion', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addLocation(mockLoc);
      await gestor.deleteLocation('LOC-01');
      expect(gestor.getAllLocations().length).toBe(0);
    });

    it('lanzar error al intentar eliminar una localizacion inexistente', async () => {
      await expect(gestor.deleteLocation('ID-FALSO')).rejects.toThrow(
        'No existe la localizacion a eliminar',
      );
    });

    it('lanzar error al actualizar una localizacion inexistente', async () => {
      const locActualizada: IntLocalizacion = {
        ...mockLoc,
        nombre: 'Ciudadela Destruida',
      };
      await expect(
        gestor.updateLocation('ID-FALSO', locActualizada),
      ).rejects.toThrow("Localizacion 'ID-FALSO' no encontrada");
    });

    it('lanzar error al actualizar una localizacion con un ID que ya existe', async () => {
      const loc2: IntLocalizacion = {
        ...mockLoc,
        id: 'LOC-02',
        nombre: 'Planeta Squanch',
      };
      await gestor.addDimension(mockDim);
      await gestor.addLocation(mockLoc);
      await gestor.addLocation(loc2);

      const locActualizada: IntLocalizacion = {
        ...mockLoc,
        id: 'LOC-02', // ID que ya existe
        nombre: 'Ciudadela Destruida',
      };
      await expect(
        gestor.updateLocation('LOC-01', locActualizada),
      ).rejects.toThrow('El nuevo ID de localizacion ya esta en uso');
    });
  });

  describe('Viajes Interdimensionales', () => {
    it('registrar un viaje y actualizar la localización del personaje', async () => {
      const dimDestino: IntDimensiones = {
        ...mockDim,
        id: 'C-131',
        nombre: 'Tierra C-131',
      };
      await gestor.addDimension(mockDim);
      await gestor.addDimension(dimDestino);
      await gestor.addCharacter(mockPersonaje);
      await gestor.registrarViaje('P-01', 'C-131', 'Escapar de la Federación');
      expect(almacen.data!.regEventos.length).toBe(1);
    });

    it('lanzar error al registrar un viaje con personaje no registrado', async () => {
      await expect(
        gestor.registrarViaje('ID-FALSO', 'C-131', 'Escapar de la Federación'),
      ).rejects.toThrow("El personaje 'ID-FALSO' no existe");
    });

    it('lanzar error al registrar un viaje con dimensión destino no registrada', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      await expect(
        gestor.registrarViaje('P-01', 'ID-FALSO', 'Escapar de la Federación'),
      ).rejects.toThrow("La dimension destino 'ID-FALSO' no existe");
    });
  });

  describe('Especies', () => {
    it('añadir especie', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addSpecies(mockEspecie);
      expect(gestor.getAllSpecies()).toContainEqual(mockEspecie);
    });

    it('lanzar error si el ID de especie ya existe', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addSpecies(mockEspecie);
      await expect(gestor.addSpecies(mockEspecie)).rejects.toThrow(
        "La especie con ID 'ESP-01' ya existe.",
      );
    });

    it('lanzar error si la dimension de origen de la especie no esta registrada', async () => {
      const especieSinDim: IntEspecies = {
        ...mockEspecie,
        id: 'ESP-02',
        nombre: 'Cronenberg',
        origen: {
          ...mockDim,
          id: 'C-999',
          nombre: 'Dimensión Desconocida',
        },
      };
      await expect(gestor.addSpecies(especieSinDim)).rejects.toThrow(
        "El origen 'Dimensión Desconocida' no existe.",
      );
    });

    it('eliminar especie y actualizar personajes asociados', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addSpecies(mockEspecie);
      await gestor.addCharacter(mockPersonaje);
      await gestor.deleteSpecies('ESP-01');

      const p = gestor.getAllCharacters()[0];
      expect(p.especie.id).toBe('ESP-01');
    });

    it('lanzar error al eliminar una especie inexistente', async () => {
      await expect(gestor.deleteSpecies('ID-FALSO')).rejects.toThrow(
        'No existe la especie a eliminar',
      );
    });

    it('actualizar una especie existente', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addSpecies(mockEspecie);
      const especieActualizada: IntEspecies = {
        ...mockEspecie,
        nombre: 'Humano Actualizado',
      };
      await gestor.updateSpecies('ESP-01', especieActualizada);

      expect(gestor.getAllSpecies()[0].nombre).toBe('Humano Actualizado');
    });

    it('lanzar error al actualizar una especie inexistente', async () => {
      const especieActualizada: IntEspecies = {
        ...mockEspecie,
        nombre: 'Humano Actualizado',
      };
      await expect(
        gestor.updateSpecies('ID-FALSO', especieActualizada),
      ).rejects.toThrow("Especie 'ID-FALSO' no encontrada.");
    });

    it('lanzar error al actualizar una especie con un ID que ya existe', async () => {
      const especie2: IntEspecies = {
        ...mockEspecie,
        id: 'ESP-02',
        nombre: 'Cronenberg',
      };
      await gestor.addDimension(mockDim);
      await gestor.addSpecies(mockEspecie);
      await gestor.addSpecies(especie2);

      const especieActualizada: IntEspecies = {
        ...mockEspecie,
        id: 'ESP-02', // ID que ya existe
        nombre: 'Humano Actualizado',
      };
      await expect(
        gestor.updateSpecies('ESP-01', especieActualizada),
      ).rejects.toThrow('El nuevo ID de especie ya esta registrado.');
    });
  });
});
