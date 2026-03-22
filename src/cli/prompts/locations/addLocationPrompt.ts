import prompts from "prompts";

export async function addLocationPrompt() {

  const response = await prompts([
    {
      type: "text",
      name: "id",
      message: "ID de la localización:"
    },
    {
      type: "text",
      name: "name",
      message: "Nombre:"
    },
    {
      type: "text",
      name: "type",
      message: "Tipo (planeta, estación, simulación...)"
    },
    {
      type: "text",
      name: "dimension",
      message: "Dimensión:"
    },
    {
      type: "number",
      name: "population",
      message: "Población aproximada:"
    },
    {
      type: "text",
      name: "description",
      message: "Descripción:"
    }
  ]);

  return response;
}