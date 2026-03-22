import type { CharacterOutput } from "../types/character.js";

export function printCharacter(characters : CharacterOutput[]) {
    if (characters.length > 0) {
        console.log('No se han encontrado personajes con ese filtro');
    } else {
    console.table(
        characters.map(c => ({
        Nombre: c.name,
        Especie: c.species,
        Estado: c.state,
        Dimensión: c.dimension,
        Afiliación: c.afiliation,
        Inteligencia: c.intelligenceLevel
        }))
    );
    }
}

export function printDimensions(dimensions: any[]) {

  if (dimensions.length === 0) {
    console.log(" No hay dimensiones registradas");
    return;
  }

  console.table(
    dimensions.map(d => ({
      ID: d.id,
      Nombre: d.name,
      Estado: d.state,
      NivelTecnologico: d.technologicalLevel
    }))
  );
}

export function printLocations(locations: any[]) {

  if (!locations || locations.length === 0) {
    console.log(" No se encontraron localizaciones");
    return;
  }

  console.table(
    locations.map(loc => ({
      ID: loc.id,
      Nombre: loc.name,
      Tipo: loc.type,
      Dimension: loc.dimension,
      Poblacion: loc.population,
      Descripcion: loc.description
    }))
  );
}

export function printSpecies(species: any[]) {

  if (!species || species.length === 0) {
    console.log("No hay especies registradas");
    return;
  }

  console.table(
    species.map(s => ({
      ID: s.id,
      Nombre: s.name,
      Origen: s.origin,
      Tipo: s.type,
      VidaMedia: s.averageLifeSpan
    }))
  );
}

export function printArtifacts(artifacts: any[]) {

  if (!artifacts || artifacts.length === 0) {
    console.log("❌ No hay inventos registrados");
    return;
  }

  console.table(
    artifacts.map(a => ({
      ID: a.id,
      Nombre: a.name,
      Inventor: a.inventor,
      Tipo: a.type,
      NivelPeligrosidad: a.dangerLevel,
      Descripcion: a.description
    }))
  );
}