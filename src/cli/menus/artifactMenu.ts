// artifactMenu.ts
import prompts from 'prompts';
import { addArtifactPrompt } from '../prompts/artifact/addArtifactPrompt.js';
import { editArtifactPrompt } from '../prompts/artifact/editArtifactPrompt.js';
import { deleteArtifactPrompt } from '../prompts/artifact/deleteArtifactPrompt.js';
import { printArtifacts } from '../utils/printer.js';
import { searchArtifactMenu } from './searchArtifactMenu.js';
import { GestorMultiverso } from '../../models/classes/gestormultiverso.js';
import { Artefacto } from '../../models/classes/artefactos.js';
import { IntArtefactos } from '../../models/interfaces.js';
import { Nivel } from '../../models/niveles.js';

/**
 * Función que muestra el menú de gestión de artefactos en la CLI.
 * Permite al usuario añadir, modificar, eliminar, listar y buscar artefactos en el sistema.
 * @param gestor - Instancia del GestorMultiverso que maneja la lógica de negocio relacionada con los artefactos
 */
export async function artifactMenu(gestor: GestorMultiverso) {
  let back = false;

  while (!back) {
    const response = await prompts({
      type: 'select',
      name: 'option',
      message: ' Menú de Inventos / Artefactos',
      choices: [
        { title: ' Añadir invento', value: 'add' },
        { title: ' Modificar invento', value: 'edit' },
        { title: ' Eliminar invento', value: 'delete' },
        { title: ' Listar inventos', value: 'list' },
        { title: ' Buscar invento', value: 'search' },
        { title: ' Volver', value: 'back' },
      ],
    });

    switch (response.option) {
      case 'add':
        const newArtifact = await addArtifactPrompt();
        const inventor = gestor
          .getAllCharacters()
          .find(
            (p) =>
              p.nombre === newArtifact.inventor ||
              p.id === newArtifact.inventor,
          );
        if (!inventor) {
          console.log(
            'Inventor no encontrado. Usa nombre o ID de un personaje existente.',
          );
          break;
        }
        await gestor.addArtifact(
          new Artefacto(
            newArtifact.id,
            newArtifact.nombre,
            inventor,
            newArtifact.tipo,
            new Nivel(newArtifact.nivel_peligrosidad),
            newArtifact.descripcion,
          ),
        );
        break;

      case 'edit':
        const updatedArtifact = await editArtifactPrompt();
        const currentArtifact = gestor
          .getAllArtifacts()
          .find((a) => a.id === updatedArtifact.id);
        if (!currentArtifact) {
          console.log('Artefacto no encontrado.');
          break;
        }
        const updatedInventor = updatedArtifact.inventor
          ? gestor
              .getAllCharacters()
              .find(
                (p) =>
                  p.nombre === updatedArtifact.inventor ||
                  p.id === updatedArtifact.inventor,
              )
          : currentArtifact.inventor;
        if (!updatedInventor) {
          console.log('Inventor no encontrado para la actualización.');
          break;
        }
        const artifactToSave: IntArtefactos = {
          ...currentArtifact,
          nombre: updatedArtifact.nombre ?? currentArtifact.nombre,
          inventor: updatedInventor,
          tipo: updatedArtifact.tipo ?? currentArtifact.tipo,
          nivel_peligrosidad: updatedArtifact.nivel_peligrosidad
            ? new Nivel(updatedArtifact.nivel_peligrosidad)
            : currentArtifact.nivel_peligrosidad,
          descripcion:
            updatedArtifact.descripcion ?? currentArtifact.descripcion,
        };
        await gestor.updateArtifact(updatedArtifact.id, artifactToSave);
        break;

      case 'delete':
        const id = await deleteArtifactPrompt();
        if (id) await gestor.deleteArtifact(id);
        break;

      case 'list':
        const artifacts: IntArtefactos[] = gestor.getAllArtifacts();
        printArtifacts(artifacts);
        break;

      case 'search':
        await searchArtifactMenu(gestor);
        break;

      case 'back':
        back = true;
        break;
    }
  }
}
