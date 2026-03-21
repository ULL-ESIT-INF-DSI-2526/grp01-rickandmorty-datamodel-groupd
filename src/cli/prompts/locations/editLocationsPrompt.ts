import prompts from "prompts";

export async function editLocationPrompt() {

  const response = await prompts([
    {
      type: "text",
      name: "id",
      message: "ID de la localización a modificar:"
    },
    {
      type: "text",
      name: "name",
      message: "Nuevo nombre:"
    },
    {
      type: "text",
      name: "type",
      message: "Nuevo tipo:"
    },
    {
      type: "text",
      name: "dimension",
      message: "Nueva dimensión:"
    },
    {
      type: "number",
      name: "population",
      message: "Nueva población aproximada:"
    },
    {
      type: "text",
      name: "description",
      message: "Nueva descripción:"
    }
  ]);

  return response;
}