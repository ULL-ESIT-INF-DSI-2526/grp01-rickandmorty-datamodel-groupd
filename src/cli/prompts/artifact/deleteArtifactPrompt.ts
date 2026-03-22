import prompts from "prompts";

export async function deleteArtifactPrompt() {
  const response = await prompts([
    { type: "text", name: "id", message: "ID del invento a eliminar:" },
    { type: "confirm", name: "confirm", message: "¿Seguro que quieres eliminar este invento?", initial: false }
  ]);
  if (!response.confirm) return null;
  return response.id;
}