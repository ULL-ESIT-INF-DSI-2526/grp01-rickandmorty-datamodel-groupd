import prompts from "prompts";
import { printArtifacts } from "../utils/printer.js";
import { GestorMultiverso } from "../../models/classes/gestormultiverso.js";
import { IntArtefactos } from "../../models/interfaces.js";
import { TipoArtefacto } from "../../models/tipos.js";

/**
 * Pide filtros y muestra inventos segun la busqueda
 * @param gestor Gestor principal del multiverso
 */
export async function searchArtifactMenu(gestor: GestorMultiverso) {

  const response = await prompts({
    type: "select",
    name: "filter",
    message: "Buscar inventos por:",
    choices: [
      { title: "Nombre", value: "nombre" },
      { title: "Tipo", value: "tipo" },
      { title: "Inventor", value: "inventor" },
      { title: "Nivel de peligrosidad", value: "peligrosidad" }
    ]
  });

  let results: IntArtefactos[] = [];

  if (response.filter === "tipo") {
    const tipoInput = await prompts({
      type: "select",
      name: "value",
      message: "Selecciona el tipo:",
      choices: [
        { title: "Arma", value: TipoArtefacto.Arma },
        { title: "Dispositivo de viaje", value: TipoArtefacto.DispositivoViaje },
        { title: "Biotecnología", value: TipoArtefacto.Biotecnologia },
        { title: "Objeto cotidiano absurdo", value: TipoArtefacto.ObjetoAbsurdo },
      ],
    });
    results = gestor.buscarArtefactos({ tipo: tipoInput.value as TipoArtefacto });
  } else {
    const input = await prompts({
      type: response.filter === "peligrosidad" ? "number" : "text",
      name: "value",
      message: `Introduce el valor para ${response.filter}:`
    });

    if (response.filter === "nombre") {
      results = gestor.buscarArtefactos({ nombre: input.value });
    }
    if (response.filter === "inventor") {
      results = gestor.buscarArtefactos({ inventor: input.value });
    }
    if (response.filter === "peligrosidad") {
      results = gestor.buscarArtefactos({ peligrosidad: input.value });
    }
  }

  printArtifacts(results);
}