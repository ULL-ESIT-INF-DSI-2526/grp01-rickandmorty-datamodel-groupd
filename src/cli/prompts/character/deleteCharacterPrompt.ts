import prompts from "prompts";

/**
 * Pide el id de un personaje para poder borrarlo
 */
export async function deleteCharacterPrompt() {
    const response = await prompts({
        type: 'text',
        name: 'id',
        message: 'Introduce el ID del personaje que quieres eliminar:'
    })
    return response.id;
}