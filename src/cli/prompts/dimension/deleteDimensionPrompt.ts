import prompts from "prompts";
import type { IntDimensiones } from "../../../models/interfaces.js";

/**
 * Muestra dimensiones y pide confirmacion para borrar una
 */
export async function deleteDimensionPrompt(dimensions: IntDimensiones[]): Promise<string | null> {
  if (dimensions.length === 0) {
    console.log("No hay dimensiones disponibles para eliminar.");
    return null;
  }

  const response = await prompts([
    {
      type: "select",
      name: "id",
      message: "Selecciona la dimensión a eliminar:",
      choices: dimensions.map(d => ({
        title: `${d.id} - ${d.nombre}`,
        value: d.id
      }))
    },
    {
      type: "confirm",
      name: "confirm",
      message: "¿Seguro que quieres eliminar esta dimensión?",
      initial: false
    }
  ]);

  if (!response.confirm) {
    return null;
  }

  return response.id;
}