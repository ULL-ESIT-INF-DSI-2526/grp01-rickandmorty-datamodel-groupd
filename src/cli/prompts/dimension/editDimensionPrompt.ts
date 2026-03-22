import prompts from "prompts";

export async function editDimensionPrompt() {
  const response = await prompts([
    {
      type: "text",
      name: "id",
      message: "ID de la dimensión que quieres modificar:"
    },
    {
      type: "text",
      name: "name",
      message: "Nuevo nombre:"
    },
    {
      type: "select",
      name: "state",
      message: "Nuevo estado:",
      choices: [
        { title: "Activa", value: "active" },
        { title: "Destruida", value: "destroyed" },
        { title: "Cuarentena", value: "quarantine" }
      ]
    },
    {
      type: "number",
      name: "technologicalLevel",
      message: "Nuevo nivel tecnológico (1-10):",
      validate: value => value < 1 || value > 10
        ? "Debe estar entre 1 y 10"
        : true
    },
    {
      type: "text",
      name: "description",
      message: "Nueva descripción:"
    }
  ]);

  return response;
}