import prompts from "prompts";

/**
 * Pide confirmacion para borrar una especie por id
 */
export async function deleteSpeciesPrompt() {

  const response = await prompts([
    {
      type: "text",
      name: "id",
      message: "ID de la especie a eliminar:"
    },
    {
      type: "confirm",
      name: "confirm",
      message: "¿Seguro que quieres eliminar esta especie?",
      initial: false
    }
  ]);

  if (!response.confirm) {
    return null;
  }

  return response.id;
}