import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GestorMultiverso } from '../../src/models/classes/gestormultiverso.js';
import { almacen } from '../../src/data/alamacen.js';
import { Dimension } from '../../src/models/classes/dimension.js';
import { Personaje } from '../../src/models/classes/personajes.js';
import { Especies } from '../../src/models/classes/especie.js';
import { Artefacto } from '../../src/models/classes/artefactos.js';
import { Localizacion } from '../../src/models/classes/localizaciones.js';
import { EstadoPersonajes, EstadoDimensiones, TipoArtefacto, TipoEspecies, AfilaicionPersonajes, TipoLocalizaciones } from '../../src/models/tipos.js';
import { IntDimensiones, IntPersonajes, IntEspecies, IntArtefactos, IntLocalizacion } from '../../src/models/interfaces.js';
import { Nivel } from '../../src/models/niveles.js';

function limpiarRegistrosEstaticos() {
  (Dimension as any).ids_registrados?.clear();
  (Personaje as any).ids_registrados?.clear();
  (Especies as any).ids_registrados?.clear();
  (Artefacto as any).ids_registrados?.clear();
  (Localizacion as any).ids_registrados?.clear();
}

describe('GestorMultiverso', () => {
  let gestor: GestorMultiverso;
  const mockDim: IntDimensiones = { id: 'C-137', nombre: 'Tierra C-137', estado: EstadoDimensiones.Activa, nivel_tec: new Nivel(10), descripcion: 'Origen de Rick',
    info: () => "Texto de prueba"};
  const mockEspecie: IntEspecies = { id: 'ESP-01', nombre: 'Humano', descripcion: 'Sapiens', origen: mockDim, tipo: TipoEspecies.Humanoide, esperanza_vida: 80,
    info: () => "Texto de prueba"};
  const mockPersonaje: IntPersonajes = { id: 'P-01', nombre: 'Rick Sanchez', especie: mockEspecie, dim_origen: mockDim, estado: EstadoPersonajes.Vivo,
    afiliacion: AfilaicionPersonajes.Independiente, nivel_inteligencia: new Nivel(10), descripcion: 'Científico', info: () => "Texto de prueba"};
  const mockLoc: IntLocalizacion = { id: 'LOC-01', nombre: 'Ciudadela de los Ricks', dimension: mockDim, tipo: TipoLocalizaciones.Planeta, descripcion: 'Sede del Consejo de Ricks',
    poblacion_aprox: 1000, info: () => "Texto de prueba"};

  beforeEach(async () => {
    almacen.data = {
      dimensiones: [],
      personajes: [],
      especies: [],
      localizaciones: [],
      artefactos: [],
      regEventos: []
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
      await expect(gestor.addDimension(mockDim)).rejects.toThrow("Error: dimension con ID 'C-137' ya registrada");
    });

    it('eliminar una dimension y actualizar el estado de sus personajes', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      await gestor.removeDimension('C-137');
      
      const p = gestor.getAllCharacters()[0];
      expect(p.dim_origen.id).toBe('NULL');
      expect(p.estado).toBe(EstadoPersonajes.Desconocido);
    });
  });

  describe('Gestion de Personajes', () => {
    it('añadir personaje', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      expect(gestor.getAllCharacters().length).toBe(1);
    });

    it('lanzar error si la dimensión del personaje no esta registrada', async () => {
      await expect(gestor.addCharacter(mockPersonaje)).rejects.toThrow("Error: La dimension 'Destruida' no esta registrada");
    });

    it('debe filtrar personajes por nombre', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      const resultados = gestor.buscarPersonajes({ nombre: 'Rick' });
      expect(resultados[0].nombre).toBe('Rick Sanchez');
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
      info: () => "Texto de prueba" 
    };

    it('añadir artefacto', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      await gestor.addArtifact(mockArt);
      expect(gestor.getAllArtifacts().length).toBe(1);
    });

    it('dejar aviso en el artefacto si el inventor es eliminado', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addCharacter(mockPersonaje);
      await gestor.addArtifact(mockArt);
      await gestor.deleteCharacter('P-01');
      
      const art = gestor.getAllArtifacts()[0];
      expect(art.descripcion).toContain(' [AVISO: Inventor eliminado] ');
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

    it('lanzar error si la dimension de la localización no esta registrada', async () => {
      await expect(gestor.addLocation(mockLoc)).rejects.toThrow("Error: La dimension 'Destruida' no existe en el registro");
    });

    it('actualizar una localizacion existente', async () => {
      await gestor.addDimension(mockDim);
      await gestor.addLocation(mockLoc);
      const locActualizada: IntLocalizacion = { ...mockLoc, nombre: 'Ciudadela Destruida' };
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
      await expect(gestor.deleteLocation('ID-FALSO')).rejects.toThrow("No existe la localizacion a eliminar");
    });
  });

  describe('Viajes Interdimensionales', () => {
    it('registrar un viaje y actualizar la localización del personaje', async () => {
      const dimDestino: IntDimensiones = { ...mockDim, id: 'C-131', nombre: 'Tierra C-131' };
      await gestor.addDimension(mockDim);
      await gestor.addDimension(dimDestino);
      await gestor.addCharacter(mockPersonaje);
      await gestor.registrarViaje('P-01', 'C-131', 'Escapar de la Federación');
      const p = gestor.getAllCharacters()[0];
      expect(almacen.data!.regEventos.length).toBe(1);
    });
  });
});