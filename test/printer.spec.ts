import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  nivelValue,
  printCharacter,
  printDimensions,
  printLocations,
  printSpecies,
  printArtifacts,
} from '../src/cli/utils/printer.js';

describe('nivelValue', () => {
  it('should return the number when value is a number', () => {
    expect(nivelValue(42)).toBe(42);
    expect(nivelValue(0)).toBe(0);
  });

  it('should return nivel property when value is an object with nivel', () => {
    expect(nivelValue({ nivel: 85 })).toBe(85);
  });

  it('should return _nivel property when value is an object with _nivel', () => {
    expect(nivelValue({ _nivel: 75 })).toBe(75);
  });

  it('should return 0 when value is null or undefined', () => {
    expect(nivelValue(null)).toBe(0);
    expect(nivelValue(undefined)).toBe(0);
  });

  it('should return 0 when object has no nivel or _nivel property', () => {
    expect(nivelValue({ other: 100 })).toBe(0);
  });

  it('should return 0 for string values', () => {
    expect(nivelValue('string')).toBe(0);
  });
});

describe('printCharacter', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation();
    vi.spyOn(console, 'table').mockImplementation();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should log message when characters array is empty', () => {
    printCharacter([]);
    expect(console.log).toHaveBeenCalledWith(
      'No se han encontrado personajes con ese filtro',
    );
  });

  it('should call console.table with formatted character data', () => {
    const characters = [
      {
        id: 1,
        nombre: 'Rick',
        especie: { nombre: 'Humano' },
        estado: 'Vivo',
        dim_origen: { nombre: 'Dimension C-137' },
        afiliacion: 'None',
        nivel_inteligencia: 95,
      },
    ];
    printCharacter(characters as any);
    expect(console.table).toHaveBeenCalled();
  });
});

describe('printDimensions', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation();
    vi.spyOn(console, 'table').mockImplementation();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should log message when dimensions array is empty', () => {
    printDimensions([]);
    expect(console.log).toHaveBeenCalledWith(' No hay dimensiones registradas');
  });

  it('should call console.table with formatted dimensions', () => {
    const dimensions = [
      { id: 1, nombre: 'C-137', estado: 'Activa', nivel_tec: 95 },
    ];
    printDimensions(dimensions as any);
    expect(console.table).toHaveBeenCalled();
  });
});

describe('printLocations', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation();
    vi.spyOn(console, 'table').mockImplementation();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should log message when locations is null or empty', () => {
    printLocations([]);
    expect(console.log).toHaveBeenCalledWith(
      ' No se encontraron localizaciones',
    );
  });

  it('should call console.table with formatted locations', () => {
    const locations = [
      {
        id: 1,
        nombre: 'Citadela',
        tipo: 'Nave',
        dimension: { nombre: 'C-137' },
        poblacion_aprox: 1000,
        descripcion: 'Descripción',
      },
    ];
    printLocations(locations as any);
    expect(console.table).toHaveBeenCalled();
  });
});

describe('printSpecies', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation();
    vi.spyOn(console, 'table').mockImplementation();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should log message when species is empty or null', () => {
    printSpecies([]);
    expect(console.log).toHaveBeenCalledWith('No hay especies registradas');
  });

  it('should call console.table with formatted species', () => {
    const species = [
      {
        id: 1,
        nombre: 'Humano',
        origen: { nombre: 'Tierra' },
        tipo: 'Bípedo',
        esperanza_vida: 80,
        descripcion: 'Especie humana',
      },
    ];
    printSpecies(species as any);
    expect(console.table).toHaveBeenCalled();
  });
});

describe('printArtifacts', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation();
    vi.spyOn(console, 'table').mockImplementation();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should log message when artifacts is empty or null', () => {
    printArtifacts([]);
    expect(console.log).toHaveBeenCalledWith('❌ No hay inventos registrados');
  });

  it('should call console.table with formatted artifacts', () => {
    const artifacts = [
      {
        id: 1,
        nombre: 'Portal Gun',
        inventor: { nombre: 'Rick' },
        tipo: 'Arma',
        nivel_peligrosidad: 100,
        descripcion: 'Pistola portales',
      },
    ];
    printArtifacts(artifacts as any);
    expect(console.table).toHaveBeenCalled();
  });
});
