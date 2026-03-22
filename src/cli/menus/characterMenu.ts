import prompts from "prompts";
import { addCharacterPrompt } from "../prompts/character/addCharacterPrompt.js";
import { searchCharacterPrompt } from "../prompts/character/searchCharacterPrompt.js";
import { printCharacter } from "../utils/printer.js";
import { deleteCharacterPrompt } from "../prompts/character/deleteCharacterPrompt.js";
import { editCharacterPrompt } from "../prompts/character/editCharacterPrompt.js";
import { GestorMultiverso } from "../../models/classes/gestormultiverso.js";
import { IntPersonajes } from "../../models/interfaces.js";
import { Nivel } from "../../models/niveles.js";
import { Personaje } from "../../models/classes/personajes.js";

/**
 * Devuelve un nivel numerico aunque el dato venga del JSON
 * @param value Nivel en memoria o nivel guardado
 */
function nivelValue(value: unknown): number {
    if (typeof value === 'number') return value;
    if (value && typeof value === 'object') {
        const maybeNivel = (value as { nivel?: unknown }).nivel;
        if (typeof maybeNivel === 'number') return maybeNivel;
        const maybePrivateNivel = (value as { _nivel?: unknown })._nivel;
        if (typeof maybePrivateNivel === 'number') return maybePrivateNivel;
    }
    return 0;
}

/**
 * Muestra el menu de personajes y ejecuta cada accion
 * @param gestor Gestor principal del multiverso
 */
export async function characterMenu(gestor: GestorMultiverso) {
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
                {title: 'Versiones alternativas', value: 'alternatives'},
                {title: 'Listar todos', value: 'list'},
                {title: 'Volver', value: 'back'}
            ]
        });
        switch (response.option) {
            case 'add':
                const newCharacter = await addCharacterPrompt();
                const newSpecies = gestor.getAllSpecies().find(s => s.nombre === newCharacter.species);
                const newDimension = gestor.getAllDimensions().find(d => d.nombre === newCharacter.dimension);
                if (!newSpecies || !newDimension) {
                    console.log('Especie o dimensión no encontrada. Deben existir antes de crear un personaje.');
                    break;
                }
                await gestor.addCharacter(new Personaje(
                    newCharacter.id,
                    newCharacter.name,
                    newSpecies,
                    newDimension,
                    newCharacter.state,
                    newCharacter.afiliation,
                    new Nivel(newCharacter.intelligenceLevel),
                    newCharacter.description,
                ));
                break;
            case 'search':
                const searchInput = await searchCharacterPrompt();
                const results : IntPersonajes[] = sortCharacters(
                    gestor.buscarPersonajes(searchInput.filters),
                    searchInput.sort.field,
                    searchInput.sort.direction,
                );
                if (results.length === 0) {
                    console.log('No se han encontrado personajes con ese nombre.');
                    break;
                }
                printCharacter(results);
                break;
            case 'alternatives':
                const alternativeName = await prompts({
                    type: 'text',
                    name: 'value',
                    message: 'Nombre del personaje para ver versiones alternativas:',
                });
                const alternatives: IntPersonajes[] = gestor.localizarVersionesAlternativas(alternativeName.value);
                if (alternatives.length === 0) {
                    console.log('No se han encontrado versiones alternativas para ese personaje.');
                    break;
                }
                printCharacter(alternatives);
                break;
            case 'modify':
                const character = await editCharacterPrompt();
                const currentCharacter = gestor.getAllCharacters().find(c => c.id === character.id);
                if (!currentCharacter) {
                    console.log('No existe un personaje con ese ID.');
                    break;
                }
                const updatedSpecies = character.species
                    ? gestor.getAllSpecies().find(s => s.nombre === character.species)
                    : currentCharacter.especie;
                const updatedDimension = character.dimension
                    ? gestor.getAllDimensions().find(d => d.nombre === character.dimension)
                    : currentCharacter.dim_origen;
                if (!updatedSpecies || !updatedDimension) {
                    console.log('Especie o dimensión inválida para actualizar el personaje.');
                    break;
                }
                const updatedCharacter : IntPersonajes = {
                    ...currentCharacter,
                    nombre: character.name ?? currentCharacter.nombre,
                    especie: updatedSpecies,
                    dim_origen: updatedDimension,
                    estado: character.state ?? currentCharacter.estado,
                    afiliacion: character.afiliation ?? currentCharacter.afiliacion,
                    nivel_inteligencia: new Nivel(character.intelligenceLevel ?? nivelValue(currentCharacter.nivel_inteligencia)),
                    descripcion: character.description ?? currentCharacter.descripcion,
                };
                await gestor.updateCharacter(character.id, updatedCharacter);
                break;
            case 'list':
                const characters : IntPersonajes[] = gestor.getAllCharacters();
                printCharacter(characters);
                break;
            case 'delete':
                const characterId : string = await deleteCharacterPrompt();
                await gestor.deleteCharacter(characterId);
                break;
            case 'back':
                back = true;
                break;
        }
    }
}

/**
 * Ordena personajes por nombre o por inteligencia
 * @param characters Lista de personajes filtrados
 * @param field Campo por el que se ordena
 * @param direction Sentido ascendente o descendente
 */
function sortCharacters(
    characters: IntPersonajes[],
    field: 'none' | 'nombre' | 'inteligencia',
    direction: 'asc' | 'desc',
): IntPersonajes[] {
    const sorted = [...characters];
    if (field === 'none') {
        return sorted;
    }
    if (field === 'nombre') {
        sorted.sort((a, b) => direction === 'asc'
            ? a.nombre.localeCompare(b.nombre)
            : b.nombre.localeCompare(a.nombre));
    }
    if (field === 'inteligencia') {
        sorted.sort((a, b) => direction === 'asc'
            ? nivelValue(a.nivel_inteligencia) - nivelValue(b.nivel_inteligencia)
            : nivelValue(b.nivel_inteligencia) - nivelValue(a.nivel_inteligencia));
    }
    return sorted;
}