import prompts from "prompts";
import { TipoLocalizaciones } from "../../../models/tipos.js";

export type AddLocationInput = {
  id: string;
  nombre: string;
  tipo: TipoLocalizaciones;
  dimension: string;
  poblacion_aprox: number;
  descripcion: string;
};

export async function addLocationPrompt(): Promise<AddLocationInput> {

  const response: AddLocationInput = await prompts([
    {
      type: "text",
      name: "id",
      message: "ID de la localización:"
    },
    {
      type: "text",
      name: "nombre",
      message: "Nombre:"
    },
    {
      type: "select",
      name: "tipo",
      message: "Tipo:",
      choices: [
        { title: "Planeta", value: TipoLocalizaciones.Planeta },
        { title: "Estación Espacial", value: TipoLocalizaciones.EstacionEspacial },
        { title: "Dimensión de bolsillo", value: TipoLocalizaciones.DimensionBolsillo },
        { title: "Simulación Virtual", value: TipoLocalizaciones.SimVirtual },
      ]
    },
    {
      type: "text",
      name: "dimension",
      message: "Dimensión:"
    },
    {
      type: "number",
      name: "poblacion_aprox",
      message: "Población aproximada:"
    },
    {
      type: "text",
      name: "descripcion",
      message: "Descripción:"
    }
  ]);

  return response;
}