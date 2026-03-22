import prompts from "prompts";

export async function deleteDimensionPrompt() {
  const response = await prompts([
    {
      type: "text",
      name: "id",
      message: "ID de la dimensión a eliminar:"
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