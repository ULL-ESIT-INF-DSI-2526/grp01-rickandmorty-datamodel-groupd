import prompts from "prompts";
import { EstadoDimensiones } from "../../../models/tipos.js";

export type AddDimensionInput = {
  id: string;
  nombre: string;
  estado: EstadoDimensiones;
  nivel_tec: number;
  descripcion: string;
};

/**
 * Pide los datos para crear una dimension nueva
 */
export async function addDimensionPrompt() : Promise<AddDimensionInput> {
  const response = await prompts([
    {
      type: "text",
      name: "id",
      message: "ID de la dimensión (ej: C-137, debe iniciar con mayúscula):",
      validate: (value: string) => {
        const regex = /^[A-Z]-?[A-Za-z0-9α-ωΑ-Ω]+$/;
        return regex.test(value) ? true : "Debe iniciar con mayúscula, seguido de guión opcional y caracteres alfanuméricos";
      }
    },
    {
      type: "text",
      name: "nombre",
      message: "Nombre:"
    },
    {
      type: "select",
      name: "estado",
      message: "Estado:",
      choices: [
        { title: "Activa", value: EstadoDimensiones.Activa },
        { title: "Destruida", value: EstadoDimensiones.Destruida },
        { title: "Cuarentena", value: EstadoDimensiones.Cuarentena }
      ]
    },
    {
      type: "number",
      name: "nivel_tec",
      message: "Nivel tecnológico (1-10):",
      validate: value => value < 1 || value > 10
        ? "Debe estar entre 1 y 10"
        : true
    },
    {
      type: "text",
      name: "descripcion",
      message: "Descripción:"
    }
  ]);

  return response;
}