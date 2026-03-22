import prompts from "prompts";
import { addCharacterPrompt } from "../prompts/character/addCharacterPrompt.js";
import { searchCharacterPrompt } from "../prompts/character/searchCharacterPrompt.js";
import { printCharacter } from "../utils/printer.js";
import { deleteCharacterPrompt } from "../prompts/character/deleteCharacterPrompt.js";
import { editCharacterPrompt } from "../prompts/character/editCharacterPrompt.js";
import type { CharacterOutput } from "../types/character.js";

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
                {title: 'Modificar personaje', value: 'modify'},
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
            case 'modify':
                const character = await editCharacterPrompt();
                gestor.updateCharacter(character.id, character);
                break;
            case 'list':
                const characters : CharacterOutput[] = gestor.getAllCharacters();
                printCharacter(characters);
                break;
            case 'delete':
                const characterId : string = await deleteCharacterPrompt();
                gestor.deleteCharacter(characterId);
                break;
            case 'back':
                back = true;
                break;
        }
    }
}