import prompts from "prompts";

export async function editSpeciesPrompt() {

  const response = await prompts([
    {
      type: "text",
      name: "id",
      message: "ID de la especie a modificar:"
    },
    {
      type: "text",
      name: "name",
      message: "Nuevo nombre:"
    },
    {
      type: "text",
      name: "origin",
      message: "Nuevo origen:"
    },
    {
      type: "text",
      name: "type",
      message: "Nuevo tipo:"
    },
    {
      type: "number",
      name: "averageLifeSpan",
      message: "Nueva esperanza de vida:"
    },
    {
      type: "text",
      name: "description",
      message: "Nueva descripción:"
    }
  ]);

  return response;
}