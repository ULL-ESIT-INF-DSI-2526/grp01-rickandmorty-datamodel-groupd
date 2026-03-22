import prompts from 'prompts';
import { characterMenu } from './menus/characterMenu.js';
import { artifactMenu } from './menus/artifactMenu.js';
import { locationMenu } from './menus/locationMenu.js';
import { speciesMenu } from './menus/speciesMenu.js';
import { dimensionMenu } from './menus/dimensionMenu.js';

import { GestorMultiverso } from '../models/classes/gestormultiverso.js';
import { inizilizarAlmacen } from '../data/alamacen.js';


export async function mainMenu() {
    let exit : boolean = false;
    while (!exit) {
        const response = await prompts({
            type: 'select',
            name: 'option',
            message: 'Gestor del Multiverso - Menú Principal',
            choices: [
                {title: 'Personajes', value: 'characters' },
                {title: 'Dimensiones', value: 'dimensions' },
                {title: 'Especies', value: 'species'},
                {title: 'Localizaciones', value: 'locations'},
                {title: 'Inventos', value: 'inventions'},
                {title: 'Salir', value: 'exit'}
            ]
            });
            await inizilizarAlmacen();
            const gestor = new GestorMultiverso();
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
            case 'exit':
                exit = true;
        }
    }
}

mainMenu()