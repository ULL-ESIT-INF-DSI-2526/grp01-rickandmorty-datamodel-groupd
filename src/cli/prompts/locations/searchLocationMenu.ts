import prompts from "prompts";
import { printLocations } from "../../utils/printer.js";
import { GestorMultiverso } from "../../../models/classes/gestormultiverso.js";
import { IntLocalizacion } from "../../../models/interfaces.js";
import { TipoLocalizaciones } from "../../../models/tipos.js";

/**
 * Pide filtros y muestra localizaciones segun la busqueda
 * @param gestor Gestor principal del multiverso
 */
export async function searchLocationMenu(gestor: GestorMultiverso) {

  const response = await prompts({
    type: "select",
    name: "filter",
    message: "Buscar localizaciones por:",
    choices: [
      { title: "Nombre", value: "nombre" },
      { title: "Tipo", value: "tipo" },
      { title: "Dimensión", value: "dimension" }
    ]
  });

  const allLocations = gestor.getAllLocations();
  let results: IntLocalizacion[] = [];

  if (response.filter === "tipo") {
    const tipoInput = await prompts({
      type: "select",
      name: "value",
      message: "Selecciona el tipo:",
      choices: [
        { title: "Planeta", value: TipoLocalizaciones.Planeta },
        { title: "Estación Espacial", value: TipoLocalizaciones.EstacionEspacial },
        { title: "Dimensión de bolsillo", value: TipoLocalizaciones.DimensionBolsillo },
        { title: "Simulación Virtual", value: TipoLocalizaciones.SimVirtual },
      ]
    });
    results = allLocations.filter(l => l.tipo === tipoInput.value);
  } else {
    const input = await prompts({
      type: "text",
      name: "value",
      message: "Introduce el valor:"
    });

    if (response.filter === "nombre") {
      results = allLocations.filter(l => l.nombre.toLowerCase().includes(input.value.toLowerCase()));
    }
    if (response.filter === "dimension") {
      results = allLocations.filter(l => l.dimension.nombre.toLowerCase().includes(input.value.toLowerCase()));
    }
  }

  printLocations(results);
}