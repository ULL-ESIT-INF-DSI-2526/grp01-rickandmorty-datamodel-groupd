import prompts from "prompts";
import { addLocationPrompt} from "../prompts/locations/addLocationPrompt.js";
import { editLocationPrompt } from "../prompts/locations/editLocationsPrompt.js";
import { deleteLocationPrompt } from "../prompts/locations/deleteLocationPrompt.js";
import { printLocations } from "../utils/printer.js";
import { searchLocationMenu } from "../prompts/locations/searchLocationMenu.js";
import { GestorMultiverso } from "../../models/classes/gestormultiverso.js";
import { IntLocalizacion } from "../../models/interfaces.js";
import { Localizacion } from "../../models/classes/localizaciones.js";

export async function locationMenu(gestor: GestorMultiverso) {

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
        const dimension = gestor.getAllDimensions().find(d => d.nombre === newLocation.dimension || d.id === newLocation.dimension);
        if (!dimension) {
          console.log("Dimensión no encontrada. Usa nombre o ID de una dimensión existente.");
          break;
        }
        await gestor.addLocation(new Localizacion(
          newLocation.id,
          newLocation.nombre,
          newLocation.tipo,
          dimension,
          newLocation.poblacion_aprox,
          newLocation.descripcion,
        ));
        break;

      case "edit":
        const updatedLocation = await editLocationPrompt();
        const currentLocation = gestor.getAllLocations().find(l => l.id === updatedLocation.id);
        if (!currentLocation) {
          console.log("Localización no encontrada.");
          break;
        }
        const updatedDimension = updatedLocation.dimension
          ? gestor.getAllDimensions().find(d => d.nombre === updatedLocation.dimension || d.id === updatedLocation.dimension)
          : currentLocation.dimension;
        if (!updatedDimension) {
          console.log("Dimensión no encontrada para la actualización.");
          break;
        }
        const locationToSave: IntLocalizacion = {
          ...currentLocation,
          nombre: updatedLocation.nombre ?? currentLocation.nombre,
          tipo: updatedLocation.tipo ?? currentLocation.tipo,
          dimension: updatedDimension,
          poblacion_aprox: updatedLocation.poblacion_aprox ?? currentLocation.poblacion_aprox,
          descripcion: updatedLocation.descripcion ?? currentLocation.descripcion,
        };
        await gestor.updateLocation(updatedLocation.id, locationToSave);
        break;

      case "delete":
        const id = await deleteLocationPrompt();
        if (id) await gestor.deleteLocation(id);
        break;

      case "list":
        const locations: IntLocalizacion[] = gestor.getAllLocations();
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