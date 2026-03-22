import prompts from "prompts";

export async function addArtifactPrompt() {
  const response = await prompts([
    { type: "text", name: "id", message: "ID del invento:" },
    { type: "text", name: "name", message: "Nombre:" },
    { type: "text", name: "inventor", message: "Inventor:" },
    { type: "text", name: "type", message: "Tipo (arma, dispositivo, biotecnología, objeto absurdo...):" },
    { type: "number", name: "dangerLevel", message: "Nivel de peligrosidad (1-10):", validate: v => v < 1 || v > 10 ? "Debe estar entre 1 y 10" : true },
    { type: "text", name: "description", message: "Descripción:" }
  ]);
  return response;
}