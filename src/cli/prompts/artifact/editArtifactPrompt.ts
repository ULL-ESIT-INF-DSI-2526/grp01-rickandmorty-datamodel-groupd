import prompts from "prompts";

export async function editArtifactPrompt() {
  const response = await prompts([
    { type: "text", name: "id", message: "ID del invento a modificar:" },
    { type: "text", name: "name", message: "Nuevo nombre:" },
    { type: "text", name: "inventor", message: "Nuevo inventor:" },
    { type: "text", name: "type", message: "Nuevo tipo:" },
    { type: "number", name: "dangerLevel", message: "Nuevo nivel de peligrosidad:", validate: v => v < 1 || v > 10 ? "Debe estar entre 1 y 10" : true },
    { type: "text", name: "description", message: "Nueva descripción:" }
  ]);
  return response;
}