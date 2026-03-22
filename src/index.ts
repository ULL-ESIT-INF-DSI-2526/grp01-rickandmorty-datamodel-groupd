import { inizilizarAlmacen } from './data/alamacen.js';
import { mainMenu } from './cli/main.js';

async function start() {
  await inizilizarAlmacen();
  await mainMenu();
}

start();
