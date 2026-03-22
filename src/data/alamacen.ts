import { IntAlmacen } from './IntAlmacen.js';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const adaptador = new JSONFile<IntAlmacen>('src/data/almacen.json');

export const almacen = new Low<IntAlmacen>(adaptador, {
  dimensiones: [],
  personajes: [],
  especies: [],
  localizaciones: [],
  artefactos: [],
  regEventos: []
});

export async function inizilizarAlmacen() {
  await almacen.read();
  almacen.data ||= {
    dimensiones: [],
    personajes: [],
    especies: [],
    localizaciones: [],
    artefactos: [],
    regEventos: []
  };
  await almacen.write();
}
