import prompts from "prompts";
import { TipoArtefacto } from "../../../models/tipos.js";

export type AddArtifactInput = {
  id: string;
  nombre: string;
  inventor: string;
  tipo: TipoArtefacto;
  nivel_peligrosidad: number;
  descripcion: string;
};

/**
 * Pide los datos para crear un invento nuevo
 */
export async function addArtifactPrompt(): Promise<AddArtifactInput> {
  const response: AddArtifactInput = await prompts([
    { type: "text", name: "id", message: "ID del invento:" },
    { type: "text", name: "nombre", message: "Nombre:" },
    { type: "text", name: "inventor", message: "Inventor:" },
    {
      type: "select",
      name: "tipo",
      message: "Tipo:",
      choices: [
        { title: "Arma", value: TipoArtefacto.Arma },
        { title: "Dispositivo de viaje", value: TipoArtefacto.DispositivoViaje },
        { title: "Biotecnología", value: TipoArtefacto.Biotecnologia },
        { title: "Objeto cotidiano absurdo", value: TipoArtefacto.ObjetoAbsurdo },
      ],
    },
    {
      type: "number",
      name: "nivel_peligrosidad",
      message: "Nivel de peligrosidad (1-10):",
      validate: v => v < 1 || v > 10 ? "Debe estar entre 1 y 10" : true,
    },
    { type: "text", name: "descripcion", message: "Descripción:" }
  ]);
  return response;
}