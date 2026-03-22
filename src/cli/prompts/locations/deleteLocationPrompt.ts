import prompts from "prompts";

/**
 * Pide confirmacion para borrar una localizacion por id
 */
export async function deleteLocationPrompt() {
  const response = await prompts([
    {
      type: "text",
      name: "id",
      message: "ID de la localización a eliminar:"
    },
    {
      type: "confirm",
      name: "confirm",
      message: "¿Seguro que quieres eliminar esta localización?",
      initial: false
    }
  ]);

  if (!response.confirm) {
    return null;
  }

  return response.id;
}