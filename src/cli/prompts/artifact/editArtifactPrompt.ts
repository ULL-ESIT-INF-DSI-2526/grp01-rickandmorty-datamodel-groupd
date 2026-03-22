import prompts from "prompts";
import { TipoArtefacto } from "../../../models/tipos.js";

export type EditArtifactInput = {
  id: string;
  nombre?: string;
  inventor?: string;
  tipo?: TipoArtefacto;
  nivel_peligrosidad?: number;
  descripcion?: string;
};

/**
 * Pide cambios para actualizar un invento
 */
export async function editArtifactPrompt(): Promise<EditArtifactInput> {
  const response: EditArtifactInput = await prompts([
    { type: "text", name: "id", message: "ID del invento a modificar:" },
    { type: "text", name: "nombre", message: "Nuevo nombre:" },
    { type: "text", name: "inventor", message: "Nuevo inventor:" },
    {
      type: "select",
      name: "tipo",
      message: "Nuevo tipo:",
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
      message: "Nuevo nivel de peligrosidad:",
      validate: v => v < 1 || v > 10 ? "Debe estar entre 1 y 10" : true,
    },
    { type: "text", name: "descripcion", message: "Nueva descripción:" }
  ]);
  return response;
}