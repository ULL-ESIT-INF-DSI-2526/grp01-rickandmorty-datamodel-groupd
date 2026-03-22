import prompts from "prompts";

/**
 * Función que muestra un prompt para eliminar un personaje, solicitando el ID del personaje a eliminar.
 * @returns El iD del personaje a eliminar.
 */
export async function deleteCharacterPrompt() {
    const response = await prompts({
        type: 'text',
        name: 'id',
        message: 'Introduce el ID del personaje que quieres eliminar:'
    })
    return response.id;
}