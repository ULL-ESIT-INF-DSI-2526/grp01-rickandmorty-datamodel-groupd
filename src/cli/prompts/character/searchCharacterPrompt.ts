import prompts from "prompts";
import { AfilaicionPersonajes, EstadoPersonajes } from "../../../models/tipos.js";

export type CharacterSearchFilters =
  Partial<{ nombre: string; especie: string; afiliacion: AfilaicionPersonajes; estado: EstadoPersonajes; dimension: string }>;

export type CharacterSort = {
  field: "none" | "nombre" | "inteligencia";
  direction: "asc" | "desc";
};

export type CharacterSearchInput = {
  filters: CharacterSearchFilters;
  sort: CharacterSort;
};
/**
 * 
 * @returns retorna el nombre
 */
export async function searchCharacterPrompt() : Promise<CharacterSearchInput> {
    const response : prompts.Answers<string> = await prompts({
        type: 'select',
        name: 'filter',
        message: 'Selecciona el filtro de búsqueda:',
        choices: [
            { title: 'Nombre', value: 'nombre' },
            { title: 'Especie', value: 'especie' },
            { title: 'Estado', value: 'estado' },
            { title: 'Dimensión', value: 'dimension' },
            { title: 'Afiliación', value: 'afiliacion' },
        ]
    });

    if (response.filter === 'estado') {
      const estado = await prompts({
        type: 'select',
        name: 'value',
        message: 'Selecciona estado:',
        choices: [
          { title: 'Vivo', value: EstadoPersonajes.Vivo },
          { title: 'Muerto', value: EstadoPersonajes.Muerto },
          { title: 'Desconocido', value: EstadoPersonajes.Desconocido },
          { title: 'Robot-sustituto', value: EstadoPersonajes.RobotSustituto },
        ]
      });
      return { filters: { estado: estado.value as EstadoPersonajes }, sort: await askCharacterSort() };
    }

    if (response.filter === 'afiliacion') {
      const afiliacion = await prompts({
        type: 'select',
        name: 'value',
        message: 'Selecciona afiliación:',
        choices: [
          { title: 'Federación Galáctica', value: AfilaicionPersonajes.FedGalactica },
          { title: 'Consejo de Ricks', value: AfilaicionPersonajes.ConsejoRicks },
          { title: 'Familia Smith', value: AfilaicionPersonajes.Smiths },
          { title: 'Independiente', value: AfilaicionPersonajes.Independiente },
        ]
      });
      return { filters: { afiliacion: afiliacion.value as AfilaicionPersonajes }, sort: await askCharacterSort() };
    }

    const input = await prompts({
      type: 'text',
      name: 'value',
      message: `Introduce ${response.filter}:`
    });

    if (response.filter === 'nombre') return { filters: { nombre: input.value }, sort: await askCharacterSort() };
    if (response.filter === 'especie') return { filters: { especie: input.value }, sort: await askCharacterSort() };
    if (response.filter === 'dimension') return { filters: { dimension: input.value }, sort: await askCharacterSort() };

    return { filters: {}, sort: { field: "none", direction: "asc" } };
}

async function askCharacterSort(): Promise<CharacterSort> {
  const fieldResponse = await prompts({
    type: "select",
    name: "field",
    message: "Ordenar resultados por:",
    choices: [
      { title: "No ordenar", value: "none" },
      { title: "Nombre", value: "nombre" },
      { title: "Nivel de inteligencia", value: "inteligencia" },
    ],
  });

  if (fieldResponse.field === "none") {
    return { field: "none", direction: "asc" };
  }

  const directionResponse = await prompts({
    type: "select",
    name: "direction",
    message: "Dirección:",
    choices: [
      { title: "Ascendente", value: "asc" },
      { title: "Descendente", value: "desc" },
    ],
  });

  return {
    field: fieldResponse.field,
    direction: directionResponse.direction,
  };
}
