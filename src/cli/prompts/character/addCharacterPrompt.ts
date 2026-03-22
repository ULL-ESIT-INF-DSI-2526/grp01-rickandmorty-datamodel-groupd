import prompts from 'prompts';
import {CharacterOutput}  from '../../types/character.js';

export async function addCharacterPrompt() : Promise<CharacterOutput> {
  const response : CharacterOutput = await prompts([
    {
      type: 'text',
      name: 'name',
      message: 'Nombre:',
      validate: (value : string) => value.length <= 0 ? 'No puede estar vacío' : true 
    },
    {
      type: 'number',
      name: 'intelligenceLevel',
      message: 'Nivel de inteligencia (1-10):',
      validate: value => value < 1 || value > 10 ? 'Debe estar entre 1 y 10' : true
    },
    {
        type: 'text',
        name: 'species',
        message: 'Especie:',
        validate: (value : string) => value.length <= 0 ? 'No puede estar vacío' : true
    },
    {
        type: 'text',
        name: 'dimension',
        message: 'Dimensión:',
        validate: (value : string) => value.length <= 0 ? 'No puede estar vacío' : true
    },
    {
        type: 'text',
        name: 'state',
        message: 'Estado:',
        validate: (value : string) => value.length <= 0 ? 'No puede estar vacío' : true
    },
    {
        type: 'text',
        name: 'afiliation',
        message: 'Afiliación:',
        validate: (value : string) => value.length <= 0 ? 'No puede estar vacío' : true
    },
    {
        type: 'text',
        name: 'description',
        message: 'Descripción:',
        validate: (value : string) => value.length <= 0 ? 'No puede estar vacío' : true
    }
  ]);

  return response;
}