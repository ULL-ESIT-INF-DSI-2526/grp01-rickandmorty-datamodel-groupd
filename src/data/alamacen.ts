import { IntAlmacen } from './IntAlmacen.js';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const adaptador = new JSONFile<IntAlmacen>('src/data/almacen.json');

/**
 * Instancia de LowDB que actúa como almacén de datos para el sistema de gestión del multiverso de Rick and Morty.
 * El almacén se inicializa con una estructura vacía que incluye arrays para dimensiones, personajes, especies, localizaciones, artefactos y registros de eventos.
 */
export const almacen = new Low<IntAlmacen>(adaptador, {
  dimensiones: [],
  personajes: [],
  especies: [],
  localizaciones: [],
  artefactos: [],
  regEventos: [],
});

/**
 * Función para inicializar el almacén de datos. Lee el contenido del archivo JSON y, si no existe o está vacío,
 * establece la estructura inicial con arrays vacíos para cada tipo de entidad.
 */
export async function inizilizarAlmacen() {
  await almacen.read();
  almacen.data ||= {
    dimensiones: [],
    personajes: [],
    especies: [],
    localizaciones: [],
    artefactos: [],
    regEventos: [],
  };
  await almacen.write();
}
