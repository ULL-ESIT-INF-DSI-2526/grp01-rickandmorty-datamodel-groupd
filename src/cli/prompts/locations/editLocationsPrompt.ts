import prompts from "prompts";
import { TipoLocalizaciones } from "../../../models/tipos.js";

export type EditLocationInput = {
  id: string;
  nombre?: string;
  tipo?: TipoLocalizaciones;
  dimension?: string;
  poblacion_aprox?: number;
  descripcion?: string;
};

/**
 * Pide cambios para actualizar una localizacion
 */
export async function editLocationPrompt(): Promise<EditLocationInput> {

  const response: EditLocationInput = await prompts([
    {
      type: "text",
      name: "id",
      message: "ID de la localización a modificar:"
    },
    {
      type: "text",
      name: "nombre",
      message: "Nuevo nombre:"
    },
    {
      type: "select",
      name: "tipo",
      message: "Nuevo tipo:",
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
      message: "Nueva dimensión:"
    },
    {
      type: "number",
      name: "poblacion_aprox",
      message: "Nueva población aproximada:"
    },
    {
      type: "text",
      name: "descripcion",
      message: "Nueva descripción:"
    }
  ]);

  return response;
}