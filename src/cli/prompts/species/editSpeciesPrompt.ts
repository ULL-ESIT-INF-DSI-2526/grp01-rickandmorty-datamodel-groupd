import prompts from "prompts";
import { TipoEspecies } from "../../../models/tipos.js";

export type EditSpeciesInput = {
  id: string;
  nombre?: string;
  descripcion?: string;
  origen?: string;
  tipo?: TipoEspecies;
  esperanza_vida?: number;
};

/**
 * Pide cambios para actualizar una especie
 */
export async function editSpeciesPrompt() : Promise<EditSpeciesInput> {

  const response : EditSpeciesInput = await prompts([
    {
      type: "text",
      name: "id",
      message: "ID de la especie a modificar:"
    },
    {
      type: "text",
      name: "nombre",
      message: "Nuevo nombre:"
    },
    {
      type: "text",
      name: "origen",
      message: "Nuevo origen:"
    },
    {
      type: "select",
      name: "tipo",
      message: "Nuevo tipo:",
      choices: [
        { title: "Humanoide", value: TipoEspecies.Humanoide },
        { title: "Amorfo", value: TipoEspecies.Amorfo },
        { title: "Robótico", value: TipoEspecies.Robotico },
        { title: "Parásito", value: TipoEspecies.Parasito },
        { title: "Hivermind", value: TipoEspecies.Hivermind },
      ]
    },
    {
      type: "number",
      name: "esperanza_vida",
      message: "Nueva esperanza de vida:"
    },
    {
      type: "text",
      name: "descripcion",
      message: "Nueva descripción:"
    }
  ]);

  return response;
}