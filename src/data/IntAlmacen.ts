import { Artefacto } from '../models/classes/artefactos.js';
import { Dimension } from '../models/classes/dimension.js';
import { Especies } from '../models/classes/especie.js';
import { Localizacion } from '../models/classes/localizaciones.js';
import { Personaje } from '../models/classes/personajes.js';

export interface IntAlmacen {
  dimensiones: Dimension[];
  personajes: Personaje[];
  especies: Especies[];
  localizaciones: Localizacion[];
  artefactos: Artefacto[];
  regEventos: Evento[];
}
