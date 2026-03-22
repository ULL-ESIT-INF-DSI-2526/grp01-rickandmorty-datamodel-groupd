import prompts from "prompts";
import { TipoEspecies } from "../../../models/tipos.js";

export type AddSpeciesInput = {
  id: string;
  nombre: string;
  descripcion: string;
  origen: string;
  tipo: TipoEspecies;
  esperanza_vida: number;
};

export async function addSpeciesPrompt() : Promise<AddSpeciesInput> {

  const response : AddSpeciesInput = await prompts([
    {
      type: "text",
      name: "id",
      message: "ID de la especie:"
    },
    {
      type: "text",
      name: "nombre",
      message: "Nombre:"
    },
    {
      type: "text",
      name: "origen",
      message: "Origen (planeta o dimensión):"
    },
    {
      type: "select",
      name: "tipo",
      message: "Tipo:",
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
      message: "Esperanza de vida media:"
    },
    {
      type: "text",
      name: "descripcion",
      message: "Descripción:"
    }
  ]);

  return response;
}