import prompts from "prompts";
import { printLocations } from "../../utils/printer.js";

export async function searchLocationMenu(gestor: any) {

  const response = await prompts({
    type: "select",
    name: "filter",
    message: "Buscar localizaciones por:",
    choices: [
      { title: "Nombre", value: "name" },
      { title: "Tipo", value: "type" },
      { title: "Dimensión", value: "dimension" }
    ]
  });

  const input = await prompts({
    type: "text",
    name: "value",
    message: "Introduce el valor:"
  });

  let results = [];

  switch (response.filter) {

    case "name":
      results = gestor.findLocationsByName(input.value);
      break;

    case "type":
      results = gestor.findLocationsByType(input.value);
      break;

    case "dimension":
      results = gestor.findLocationsByDimension(input.value);
      break;

  }

  printLocations(results);
}