import prompts from "prompts";

export async function editCharacterPrompt() {

  const response = await prompts([
    {
      type: "number",
      name: "id",
      message: "ID del personaje a modificar:"
    },
    {
      type: "text",
      name: "name",
      message: "Nuevo nombre:"
    },
    {
      type: "text",
      name: "species",
      message: "Nueva especie:"
    },
    {
      type: "text",
      name: "dimension",
      message: "Nueva dimensión de origen:"
    },
    {
      type: "select",
      name: "state",
      message: "Nuevo estado:",
      choices: [
        { title: "Vivo", value: "alive" },
        { title: "Muerto", value: "dead" },
        { title: "Desconocido", value: "unknown" },
        { title: "Robot-sustituto", value: "robot" }
      ]
    },
    {
      type: "text",
      name: "afiliation",
      message: "Nueva afiliación:"
    },
    {
      type: "number",
      name: "intelligenceLevel",
      message: "Nuevo nivel de inteligencia (1-10):",
      validate: value =>
        value < 1 || value > 10
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