// artifactMenu.ts
import prompts from "prompts";
import { addArtifactPrompt } from "../prompts/artifact/addArtifactPrompt.js";
import { editArtifactPrompt } from "../prompts/artifact/editArtifactPrompt.js";
import { deleteArtifactPrompt } from "../prompts/artifact/deleteArtifactPrompt.js";
import { printArtifacts } from "../utils/printer.js";
import { searchArtifactMenu } from "./searchArtifactMenu.js";

export async function artifactMenu(gestor: any) {

  let back = false;

  while (!back) {

    const response = await prompts({
      type: "select",
      name: "option",
      message: " Menú de Inventos / Artefactos",
      choices: [
        { title: " Añadir invento", value: "add" },
        { title: " Modificar invento", value: "edit" },
        { title: " Eliminar invento", value: "delete" },
        { title: " Listar inventos", value: "list" },
        { title: " Buscar invento", value: "search" },
        { title: " Volver", value: "back" }
      ]
    });

    switch (response.option) {

      case "add":
        const newArtifact = await addArtifactPrompt();
        gestor.addArtifact(newArtifact);
        break;

      case "edit":
        const updatedArtifact = await editArtifactPrompt();
        gestor.updateArtifact(updatedArtifact.id, updatedArtifact);
        break;

      case "delete":
        const id = await deleteArtifactPrompt();
        if (id) gestor.deleteArtifact(id);
        break;

      case "list":
        const artifacts = gestor.getAllArtifacts();
        printArtifacts(artifacts);
        break;

      case "search":
        await searchArtifactMenu(gestor);
        break;

      case "back":
        back = true;
        break;
    }
  }
}