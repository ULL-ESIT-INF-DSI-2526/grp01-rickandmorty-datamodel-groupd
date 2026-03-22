import prompts from "prompts";
import { addCharacterPrompt } from "../prompts/character/addCharacterPrompt.js";
import type { CharacterOutput } from "../types/character.js";
import { searchCharacterPrompt } from "../prompts/character/searchCharacterPrompt.js";
import { printCharacter } from "../utils/printer.js";
//import gestor from "../../gestor.js" // rol 2

export async function characterMenu(gestor: any) {
    let back = false;
    while (!back) {
        const response = await prompts({
            type: 'select',
            name: 'option',
            message: 'Menú de Personajes',
            choices: [
                {title: 'Añadir personaje', value: 'add'},
                {title: 'Eliminar personaje', value: 'delete'},
                {title: 'Buscar personajes', value: 'search'},
                {title: 'Listar todos', value: 'list'},
                {title: 'Volver', value: 'back'}
            ]
        });
        switch (response.option) {
            case 'add':
                const newCharacter : CharacterOutput = await addCharacterPrompt();
                gestor.addCharacter(newCharacter);
                break;
            case 'search':
                const characterName : CharacterOutput[] = await searchCharacterPrompt();
                if (characterName.length === 0) {
                    console.log('No se han encontrado personajes con ese nombre.');
                    break;
                }
                const results : CharacterOutput[] = gestor.searchCharacterByName(characterName[0].name);
                printCharacter(results);
                break;
            case 'list':
                const characters : CharacterOutput[] = gestor.getAllCharacters();
                printCharacter(characters);
                break;
            case 'delete':
                const character : CharacterOutput[] = await searchCharacterPrompt();
                if (character.length === 0) {
                    console.log('No se han encontrado personajes con ese filter.');
                    break;
                }
                gestor.deleteCharacter(character[0].id);
                break;
            case 'back':
                back = true;
                break;
        }
    }
}