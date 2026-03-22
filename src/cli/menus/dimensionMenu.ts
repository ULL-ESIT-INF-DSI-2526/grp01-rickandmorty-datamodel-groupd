import prompts from "prompts";
import { addDimensionPrompt } from "../prompts/dimension/addDimensionPrompt.js";
import { editDimensionPrompt } from "../prompts/dimension/editDimensionPrompt.js";
import { deleteDimensionPrompt } from "../prompts/dimension/deleteDimensionPrompt.js";
import { printDimensions } from "../utils/printer.js";
import { GestorMultiverso } from "../../models/classes/gestormultiverso.js";
import { IntDimensiones } from "../../models/interfaces.js";
import { Dimension } from "../../models/classes/dimension.js";
import { Nivel } from "../../models/niveles.js";

export async function dimensionMenu(gestor: GestorMultiverso) {
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
    const newDimensionInput = await addDimensionPrompt();
    await gestor.addDimension(new Dimension(
      newDimensionInput.id,
      newDimensionInput.nombre,
      newDimensionInput.estado,
      new Nivel(newDimensionInput.nivel_tec),
      newDimensionInput.descripcion,
    ));
    break;

    case "edit":
    const editDimensionInput = await editDimensionPrompt();
    const currentDimension = gestor.getAllDimensions().find(d => d.id === editDimensionInput.id);
    if (!currentDimension) {
      console.log('Dimensión no encontrada.');
      break;
    }
    const updatedDimension: IntDimensiones = {
      ...currentDimension,
      nombre: editDimensionInput.nombre ?? currentDimension.nombre,
      estado: editDimensionInput.estado ?? currentDimension.estado,
      nivel_tec: editDimensionInput.nivel_tec ? new Nivel(editDimensionInput.nivel_tec) : currentDimension.nivel_tec,
      descripcion: editDimensionInput.descripcion ?? currentDimension.descripcion,
    };
    await gestor.updateDimension(editDimensionInput.id, updatedDimension);
    break;

    case "delete":
    const dimensionsToDelete = gestor.getAllDimensions();
    const id = await deleteDimensionPrompt(dimensionsToDelete);
    if (id) await gestor.removeDimension(id);
    break;

      case "list":
        const dimensions: IntDimensiones[] = gestor.getAllDimensions();
        printDimensions(dimensions);
        break;

      case "back":
        back = true;
        break;
    }
  }
}