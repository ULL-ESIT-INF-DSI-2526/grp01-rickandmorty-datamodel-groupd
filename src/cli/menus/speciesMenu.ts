import prompts from "prompts";
import { addSpeciesPrompt } from "../prompts/species/addSpeciesPrompt.js";
import { editSpeciesPrompt } from "../prompts/species/editSpeciesPrompt.js";
import { deleteSpeciesPrompt } from "../prompts/species/deleteSpeciesPrompts.js";
import { printSpecies } from "../utils/printer.js";

export async function speciesMenu(gestor: any) {

  let back = false;

  while (!back) {

    const response = await prompts({
      type: "select",
      name: "option",
      message: " Menú de Especies",
      choices: [
        { title: " Añadir especie", value: "add" },
        { title: " Modificar especie", value: "edit" },
        { title: " Eliminar especie", value: "delete" },
        { title: " Listar especies", value: "list" },
        { title: " Volver", value: "back" }
      ]
    });

    switch (response.option) {

      case "add":
        const newSpecies = await addSpeciesPrompt();
        gestor.addSpecies(newSpecies);
        break;

      case "edit":
        const updatedSpecies = await editSpeciesPrompt();
        gestor.updateSpecies(updatedSpecies.id, updatedSpecies);
        break;

      case "delete":
        const id = await deleteSpeciesPrompt();
        if (id) gestor.deleteSpecies(id);
        break;

      case "list":
        const species = gestor.getAllSpecies();
        printSpecies(species);
        break;

      case "back":
        back = true;
        break;
    }
  }
}