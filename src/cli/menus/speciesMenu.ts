import prompts from "prompts";
import { addSpeciesPrompt } from "../prompts/species/addSpeciesPrompt.js";
import { editSpeciesPrompt } from "../prompts/species/editSpeciesPrompt.js";
import { deleteSpeciesPrompt } from "../prompts/species/deleteSpeciesPrompts.js";
import { printSpecies } from "../utils/printer.js";
import { GestorMultiverso } from "../../models/classes/gestormultiverso.js";
import { IntEspecies } from "../../models/interfaces.js";
import { Especies } from "../../models/classes/especie.js";

export async function speciesMenu(gestor: GestorMultiverso) {

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
        const newSpeciesInput = await addSpeciesPrompt();
        const origenDimension = gestor.getAllDimensions().find(d => d.nombre === newSpeciesInput.origen);
        const origenLocalizacion = gestor.getAllLocations().find(l => l.nombre === newSpeciesInput.origen);
        const origen = origenDimension || origenLocalizacion;
        if (!origen) {
          console.log('Origen (dimensión o localización) no encontrado.');
          break;
        }
        await gestor.addSpecies(new Especies(
          newSpeciesInput.id,
          newSpeciesInput.nombre,
          newSpeciesInput.descripcion,
          origen,
          newSpeciesInput.tipo,
          newSpeciesInput.esperanza_vida,
        ));
        break;

      case "edit":
        const editSpeciesInput = await editSpeciesPrompt();
        const currentSpecies = gestor.getAllSpecies().find(s => s.id === editSpeciesInput.id);
        if (!currentSpecies) {
          console.log('Especie no encontrada.');
          break;
        }
        const updatedOrigenDimension = editSpeciesInput.origen
          ? gestor.getAllDimensions().find(d => d.nombre === editSpeciesInput.origen)
          : currentSpecies.origen;
        const updatedOrigenLocalizacion = editSpeciesInput.origen && !updatedOrigenDimension
          ? gestor.getAllLocations().find(l => l.nombre === editSpeciesInput.origen)
          : undefined;
        const updatedOrigen = updatedOrigenDimension || updatedOrigenLocalizacion || currentSpecies.origen;
        const updatedSpecies: IntEspecies = {
          ...currentSpecies,
          nombre: editSpeciesInput.nombre ?? currentSpecies.nombre,
          descripcion: editSpeciesInput.descripcion ?? currentSpecies.descripcion,
          origen: updatedOrigen,
          tipo: editSpeciesInput.tipo ?? currentSpecies.tipo,
          esperanza_vida: editSpeciesInput.esperanza_vida ?? currentSpecies.esperanza_vida,
        };
        await gestor.updateSpecies(editSpeciesInput.id, updatedSpecies);
        break;

      case "delete":
        const id = await deleteSpeciesPrompt();
        if (id) await gestor.deleteSpecies(id);
        break;

      case "list":
        const species: IntEspecies[] = gestor.getAllSpecies();
        printSpecies(species);
        break;

      case "back":
        back = true;
        break;
    }
  }
}