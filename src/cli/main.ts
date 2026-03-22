import prompts from 'prompts';
import { characterMenu } from './menus/characterMenu.js';
import { artifactMenu } from './menus/artifactMenu.js';
import { locationMenu } from './menus/locationMenu.js';
import { speciesMenu } from './menus/speciesMenu.js';
import { dimensionMenu } from './menus/dimensionMenu.js';
import { reportMenu } from './menus/reportMenu.js';

import { GestorMultiverso } from '../models/classes/gestormultiverso.js';

/**
 * Función principal que muestra el menú principal del gestor del multiverso de Rick and Morty.
 * Permite al usuario seleccionar entre diferentes opciones para gestionar personajes, dimensiones, especies, localizaciones e inventos.
 * El menú se muestra en un bucle hasta que el usuario decide salir.
 * Cada opción del menú llama a una función específica que maneja las operaciones relacionadas con esa categoría de datos.
 * Al iniciar el menú, se inicializa el almacén de datos para asegurar que esté listo para su uso.
 * @returns No retorna ningún valor, ya que la función se encarga de manejar la interacción con el usuario a través de la consola.
 */
export async function mainMenu() {
  let exit: boolean = false;
  while (!exit) {
    const response = await prompts({
      type: 'select',
      name: 'option',
      message: 'Gestor del Multiverso - Menú Principal',
      choices: [
        { title: 'Personajes', value: 'characters' },
        { title: 'Dimensiones', value: 'dimensions' },
        { title: 'Especies', value: 'species' },
        { title: 'Localizaciones', value: 'locations' },
        { title: 'Inventos', value: 'inventions' },
        { title: 'Informes', value: 'reports' },
        { title: 'Salir', value: 'exit' },
      ],
    });
    const gestor = GestorMultiverso.getInstance();
    switch (response.option) {
      case 'characters':
        await characterMenu(gestor);
        break;
      case 'dimensions':
        await dimensionMenu(gestor);
        break;
      case 'species':
        await speciesMenu(gestor);
        break;
      case 'locations':
        await locationMenu(gestor);
        break;
      case 'inventions':
        await artifactMenu(gestor);
        break;
      case 'reports':
        await reportMenu(gestor);
        break;
      case 'exit':
        exit = true;
    }
  }
}
