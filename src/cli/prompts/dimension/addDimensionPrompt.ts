import prompts from "prompts";

export async function addDimensionPrompt() {
  const response = await prompts([
    {
      type: "text",
      name: "id",
      message: "ID de la dimensión (ej: C-137):"
    },
    {
      type: "text",
      name: "name",
      message: "Nombre:"
    },
    {
      type: "select",
      name: "state",
      message: "Estado:",
      choices: [
        { title: "Activa", value: "active" },
        { title: "Destruida", value: "destroyed" },
        { title: "Cuarentena", value: "quarantine" }
      ]
    },
    {
      type: "number",
      name: "technologicalLevel",
      message: "Nivel tecnológico (1-10):",
      validate: value => value < 1 || value > 10
        ? "Debe estar entre 1 y 10"
        : true
    },
    {
      type: "text",
      name: "description",
      message: "Descripción:"
    }
  ]);

  return response;
}