import prompts from "prompts";
import { CharacterOutput } from "../../types/character.js";
/**
 * 
 * @returns retorna el nombre
 */
export async function searchCharacterPrompt() : Promise<CharacterOutput[]> {
    const response : prompts.Answers<string> = await prompts({
        type: 'select',
        name: 'filter',
        message: 'Selecciona el filtro de búsqueda:',
        choices: [
            { title: 'Nombre', value: 'name' },
            { title: 'Especie', value: 'species' },
            { title: 'Estado', value: 'status' },
            { title: 'Dimensión', value: 'dimension' },
            { title: 'Afiliación', value: 'affiliation' },
        ]
    });
    const results : CharacterOutput[] = await handleCharacterSearch(response.filter);
    return results;
}


async function handleCharacterSearch(filter: string) : Promise<CharacterOutput[]> {
  const input = await prompts({
    type: 'text',
    name: 'value',
    message: `Introduce ${filter}:`
  });

  let results : CharacterOutput[] = [];

  switch (filter) {
    case 'name':
      //results = gestor.findCharactersByName(input.value);
      break;

    case 'species':
      //results = gestor.findCharactersBySpecies(input.value);
      break;

    case 'affiliation':
      //results = gestor.findCharactersByAffiliation(input.value);
      break;

    case 'status':
      //results = gestor.findCharactersByStatus(input.value);
      break;

    case 'dimension':
      //results = gestor.findCharactersByDimension(input.value);
      break;
  }

  return await sortCharacters(results);
}

async function sortCharacters(characters : CharacterOutput[]) : Promise<CharacterOutput[]> {

  const response = await prompts([
    {
      type: 'select',
      name: 'field',
      message: 'Ordenar por:',
      choices: [
        { title: 'Nombre', value: 'name' },
        { title: 'Inteligencia', value: 'intelligence' },
        { title: 'No ordenar', value: 'none' }
      ]
    }
  ]);

  if (response.field !== 'none') {

    const order = await prompts({
      type: 'select',
      name: 'direction',
      message: 'Dirección:',
      choices: [
        { title: 'Ascendente', value: 'asc' },
        { title: 'Descendente', value: 'desc' }
      ]
    });

    characters.sort((a : CharacterOutput, b : CharacterOutput) => {

      if (response.field === 'name') {
        return order.direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }

      else if (response.field === 'intelligence') {
        return order.direction === 'asc'
          ? a.intelligenceLevel - b.intelligenceLevel
          : b.intelligenceLevel - a.intelligenceLevel;
      }
      else {
        return 0;
      }
    });
  }

  return characters;
}