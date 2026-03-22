import type { IntPersonajes } from '../../models/interfaces.js';

/**
 * Función auxiliar para extraer un valor numérico de un campo que puede ser un número directo o un objeto con una propiedad 'nivel' o '_nivel'.
 * @param value - El valor a evaluar, que puede ser un número o un objeto con una propiedad 'nivel' o '_nivel'.
 * @returns Valor numérico extraído o 0 si no se encuentra un valor válido.
 */
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

/**
 * Imprime una tabla con la información de los personajes proporcionados.
 * Si no se encuentran personajes, muestra un mensaje indicando que no se han encontrado resultados.
 * @param characters - Array de objetos que cumplen con la interfaz IntPersonajes, cuyos datos se mostrarán en la tabla.
 */
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

/**
 * Imprime una tabla con la información de las dimensiones proporcionadas.
 * Si no se encuentran dimensiones, muestra un mensaje indicando que no hay dimensiones registradas.
 * @param dimensions - Array de objetos que cumplen con la interfaz IntDimensiones, cuyos datos se mostrarán en la tabla.
 */
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

/**
 * Imprime una tabla con la información de las localizaciones proporcionadas.
 * Si no se encuentran localizaciones, muestra un mensaje indicando que no se han encontrado resultados.
 * @param locations - Array de objetos que cumplen con la interfaz IntLocalizacion, cuyos datos se mostrarán en la tabla.
 */
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

/**
 * Imprime una tabla con la información de las especies proporcionadas.
 * Si no se encuentran especies, muestra un mensaje indicando que no hay especies registradas.
 * @param species - Array de objetos que cumplen con la interfaz IntEspecies, cuyos datos se mostrarán en la tabla.
 */
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

/**
 * Imprime una tabla con la información de los artefactos proporcionados.
 * Si no se encuentran artefactos, muestra un mensaje indicando que no hay inventos registrados.
 * @param artifacts - Array de objetos que cumplen con la interfaz IntArtefactos, cuyos datos se mostrarán en la tabla.
 */
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
