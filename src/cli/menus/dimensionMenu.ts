import prompts from "prompts";
import { addDimensionPrompt } from "../prompts/dimension/addDimensionPrompt.js";
import { editDimensionPrompt } from "../prompts/dimension/editDimensionPrompt.js";
import { deleteDimensionPrompt } from "../prompts/dimension/deleteDimensionPrompt.js";
import { printDimensions } from "../utils/printer.js";

export async function dimensionMenu(gestor: any) {
  let back = false;

  while (!back) {
    const response = await prompts({
      type: "select",
      name: "option",
      message: " Menú de Dimensiones",
      choices: [
        { title: " Añadir dimensión", value: "add" },
        { title: " Modificar dimensión", value: "edit" },
        { title: " Eliminar dimensión", value: "delete" },
        { title: " Listar dimensiones", value: "list" },
        { title: " Volver", value: "back" }
      ]
    });

    switch (response.option) {

    case "add":
    const dimension = await addDimensionPrompt();
    gestor.addDimension(dimension);
    break;

    case "edit":
    const updated = await editDimensionPrompt();
    gestor.updateDimension(updated.id, updated);
    break;

    case "delete":
    const id = await deleteDimensionPrompt();
    if (id) gestor.deleteDimension(id);
    break;

      case "list":
        const dimensions = gestor.getAllDimensions();
        printDimensions(dimensions);
        break;

      case "back":
        back = true;
        break;
    }
  }
}