import prompts from "prompts";
import { addLocationPrompt} from "../prompts/locations/addLocationPrompt.js";
import { editLocationPrompt } from "../prompts/locations/editLocationsPrompt.js";
import { deleteLocationPrompt } from "../prompts/locations/deleteLocationPrompt.js";
import { printLocations } from "../utils/printer.js";
import { searchLocationMenu } from "../prompts/locations/searchLocationMenu.js";

export async function locationMenu(gestor: any) {

  let back = false;

  while (!back) {

    const response = await prompts({
      type: "select",
      name: "option",
      message: " Menú de Localizaciones",
      choices: [
        { title: " Añadir localización", value: "add" },
        { title: " Modificar localización", value: "edit" },
        { title: " Eliminar localización", value: "delete" },
        { title: " Listar localizaciones", value: "list" },
        { title: " Buscar localización", value: "search" },
        { title: " Volver", value: "back" }
      ]
    });

    switch (response.option) {

      case "add":
        const newLocation = await addLocationPrompt();
        gestor.addLocation(newLocation);
        break;

      case "edit":
        const updatedLocation = await editLocationPrompt();
        gestor.updateLocation(updatedLocation.id, updatedLocation);
        break;

      case "delete":
        const id = await deleteLocationPrompt();
        if (id) gestor.deleteLocation(id);
        break;

      case "list":
        const locations = gestor.getAllLocations();
        printLocations(locations);
        break;

      case "search":
        await searchLocationMenu(gestor);
        break;

      case "back":
        back = true;
        break;
    }
  }
}