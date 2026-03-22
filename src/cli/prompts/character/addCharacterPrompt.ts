import prompts from 'prompts';
import { AfilaicionPersonajes, EstadoPersonajes } from '../../../models/tipos.js';

export type AddCharacterInput = {
  id: string;
  name: string;
  intelligenceLevel: number;
  species: string;
  dimension: string;
  state: EstadoPersonajes;
  afiliation: AfilaicionPersonajes;
  description: string;
};

export async function addCharacterPrompt() : Promise<AddCharacterInput> {
  const response : AddCharacterInput = await prompts([
    {
      type: 'text',
      name: 'id',
      message: 'ID:',
      validate: (value : string) => value.length <= 0 ? 'No puede estar vacío' : true
    },
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
        type: 'select',
        name: 'state',
        message: 'Estado:',
        choices: [
          { title: 'Vivo', value: EstadoPersonajes.Vivo },
          { title: 'Muerto', value: EstadoPersonajes.Muerto },
          { title: 'Desconocido', value: EstadoPersonajes.Desconocido },
          { title: 'Robot-sustituto', value: EstadoPersonajes.RobotSustituto },
        ]
    },
    {
        type: 'select',
        name: 'afiliation',
        message: 'Afiliación:',
        choices: [
          { title: 'Federación Galáctica', value: AfilaicionPersonajes.FedGalactica },
          { title: 'Consejo de Ricks', value: AfilaicionPersonajes.ConsejoRicks },
          { title: 'Familia Smith', value: AfilaicionPersonajes.Smiths },
          { title: 'Independiente', value: AfilaicionPersonajes.Independiente },
        ]
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