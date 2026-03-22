import type { IntPersonajes } from '../../models/interfaces.js';

export function nivelValue(value: unknown): number {
  if (typeof value === 'number') return value;
  if (value && typeof value === 'object') {
    const maybeNivel = (value as { nivel?: unknown }).nivel;
    if (typeof maybeNivel === 'number') return maybeNivel;
    const maybePrivateNivel = (value as { _nivel?: unknown })._nivel;
    if (typeof maybePrivateNivel === 'number') return maybePrivateNivel;
  }
  return 0;
}

export function printCharacter(characters: IntPersonajes[]) {
  if (characters.length === 0) {
    console.log('No se han encontrado personajes con ese filtro');
  } else {
    console.table(
      characters.map((c) => ({
        ID: c.id,
        Nombre: c.nombre,
        Especie: c.especie.nombre,
        Estado: c.estado,
        Dimensión: c.dim_origen.nombre,
        Afiliación: c.afiliacion,
        Inteligencia: nivelValue(c.nivel_inteligencia),
      })),
    );
  }
}

export function printDimensions(
  dimensions: import('../../models/interfaces.js').IntDimensiones[],
) {
  if (dimensions.length === 0) {
    console.log(' No hay dimensiones registradas');
    return;
  }

  console.table(
    dimensions.map((d) => ({
      ID: d.id,
      Nombre: d.nombre,
      Estado: d.estado,
      NivelTecnologico: nivelValue(d.nivel_tec),
    })),
  );
}

export function printLocations(
  locations: import('../../models/interfaces.js').IntLocalizacion[],
) {
  if (!locations || locations.length === 0) {
    console.log(' No se encontraron localizaciones');
    return;
  }

  console.table(
    locations.map((loc) => ({
      ID: loc.id,
      Nombre: loc.nombre,
      Tipo: loc.tipo,
      Dimension: loc.dimension.nombre,
      Poblacion: loc.poblacion_aprox,
      Descripcion: loc.descripcion,
    })),
  );
}

export function printSpecies(
  species: import('../../models/interfaces.js').IntEspecies[],
) {
  if (!species || species.length === 0) {
    console.log('No hay especies registradas');
    return;
  }

  console.table(
    species.map((s) => ({
      ID: s.id,
      Nombre: s.nombre,
      Origen: s.origen.nombre,
      Tipo: s.tipo,
      VidaMedia: s.esperanza_vida,
      Descripcion: s.descripcion,
    })),
  );
}

export function printArtifacts(
  artifacts: import('../../models/interfaces.js').IntArtefactos[],
) {
  if (!artifacts || artifacts.length === 0) {
    console.log('❌ No hay inventos registrados');
    return;
  }

  console.table(
    artifacts.map((a) => ({
      ID: a.id,
      Nombre: a.nombre,
      Inventor: a.inventor.nombre,
      Tipo: a.tipo,
      NivelPeligrosidad: nivelValue(a.nivel_peligrosidad),
      Descripcion: a.descripcion,
    })),
  );
}
