import prompts from "prompts";
import { EstadoDimensiones } from "../../../models/tipos.js";

export type EditDimensionInput = {
  id: string;
  nombre?: string;
  estado?: EstadoDimensiones;
  nivel_tec?: number;
  descripcion?: string;
};

export async function editDimensionPrompt() : Promise<EditDimensionInput> {
  const response : EditDimensionInput = await prompts([
    {
      type: "text",
      name: "id",
      message: "ID de la dimensión que quieres modificar:"
    },
    {
      type: "text",
      name: "nombre",
      message: "Nuevo nombre:"
    },
    {
      type: "select",
      name: "estado",
      message: "Nuevo estado:",
      choices: [
        { title: "Activa", value: EstadoDimensiones.Activa },
        { title: "Destruida", value: EstadoDimensiones.Destruida },
        { title: "Cuarentena", value: EstadoDimensiones.Cuarentena }
      ]
    },
    {
      type: "number",
      name: "nivel_tec",
      message: "Nuevo nivel tecnológico (1-10):",
      validate: value => value < 1 || value > 10
        ? "Debe estar entre 1 y 10"
        : true
    },
    {
      type: "text",
      name: "descripcion",
      message: "Nueva descripción:"
    }
  ]);

  return response;
}