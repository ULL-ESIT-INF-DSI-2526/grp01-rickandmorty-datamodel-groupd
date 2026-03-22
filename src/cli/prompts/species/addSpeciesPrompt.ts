import prompts from "prompts";

export async function addSpeciesPrompt() {

  const response = await prompts([
    {
      type: "text",
      name: "id",
      message: "ID de la especie:"
    },
    {
      type: "text",
      name: "name",
      message: "Nombre:"
    },
    {
      type: "text",
      name: "origin",
      message: "Origen (planeta o dimensión):"
    },
    {
      type: "text",
      name: "type",
      message: "Tipo:"
    },
    {
      type: "number",
      name: "averageLifeSpan",
      message: "Esperanza de vida media:"
    },
    {
      type: "text",
      name: "description",
      message: "Descripción:"
    }
  ]);

  return response;
}