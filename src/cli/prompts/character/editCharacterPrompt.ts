import prompts from "prompts";
import { AfilaicionPersonajes, EstadoPersonajes } from "../../../models/tipos.js";

export type EditCharacterInput = {
  id: string;
  name?: string;
  species?: string;
  dimension?: string;
  state?: EstadoPersonajes;
  afiliation?: AfilaicionPersonajes;
  intelligenceLevel?: number;
  description?: string;
};

export async function editCharacterPrompt() : Promise<EditCharacterInput> {

  const response : EditCharacterInput = await prompts([
    {
      type: "text",
      name: "id",
      message: "ID del personaje a modificar:"
    },
    {
      type: "text",
      name: "name",
      message: "Nuevo nombre:"
    },
    {
      type: "text",
      name: "species",
      message: "Nueva especie:"
    },
    {
      type: "text",
      name: "dimension",
      message: "Nueva dimensión de origen:"
    },
    {
      type: "select",
      name: "state",
      message: "Nuevo estado:",
      choices: [
        { title: "Vivo", value: EstadoPersonajes.Vivo },
        { title: "Muerto", value: EstadoPersonajes.Muerto },
        { title: "Desconocido", value: EstadoPersonajes.Desconocido },
        { title: "Robot-sustituto", value: EstadoPersonajes.RobotSustituto }
      ]
    },
    {
      type: "select",
      name: "afiliation",
      message: "Nueva afiliación:",
      choices: [
        { title: 'Federación Galáctica', value: AfilaicionPersonajes.FedGalactica },
        { title: 'Consejo de Ricks', value: AfilaicionPersonajes.ConsejoRicks },
        { title: 'Familia Smith', value: AfilaicionPersonajes.Smiths },
        { title: 'Independiente', value: AfilaicionPersonajes.Independiente },
      ]
    },
    {
      type: "number",
      name: "intelligenceLevel",
      message: "Nuevo nivel de inteligencia (1-10):",
      validate: value =>
        value < 1 || value > 10
          ? "Debe estar entre 1 y 10"
          : true
    },
    {
      type: "text",
      name: "description",
      message: "Nueva descripción:"
    }
  ]);

  return response;
}