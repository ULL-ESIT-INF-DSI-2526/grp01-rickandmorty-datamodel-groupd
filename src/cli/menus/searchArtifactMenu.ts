import prompts from "prompts";
import { printArtifacts } from "../utils/printer.js";

export async function searchArtifactMenu(gestor: any) {

  const response = await prompts({
    type: "select",
    name: "filter",
    message: "Buscar inventos por:",
    choices: [
      { title: "Nombre", value: "name" },
      { title: "Tipo", value: "type" },
      { title: "Inventor", value: "inventor" },
      { title: "Nivel de peligrosidad", value: "dangerLevel" }
    ]
  });

  const input = await prompts({
    type: response.filter === "dangerLevel" ? "number" : "text",
    name: "value",
    message: `Introduce el valor para ${response.filter}:`
  });

  let results = [];

  switch (response.filter) {
    case "name":
      results = gestor.findArtifactsByName(input.value);
      break;
    case "type":
      results = gestor.findArtifactsByType(input.value);
      break;
    case "inventor":
      results = gestor.findArtifactsByInventor(input.value);
      break;
    case "dangerLevel":
      results = gestor.findArtifactsByDangerLevel(input.value);
      break;
  }

  printArtifacts(results);
}