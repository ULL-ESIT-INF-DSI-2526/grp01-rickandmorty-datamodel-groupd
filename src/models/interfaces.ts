import { Nivel } from './niveles.js';
import {
  EstadoDimensiones,
  EstadoPersonajes,
  TipoArtefacto,
  TipoEspecies,
  TipoLocalizaciones,
  AfilaicionPersonajes,
} from './tipos.js';

/**
 * Interfaz general para representar los atributos comunes
 * de las diferentes entidades del sistema
 * Contiene: `id`, `nombre` y `descripcion`
 */
interface IntEntidad {
  id: string;
  nombre: string;
  descripcion: string;
  info(): string;
}

/**
 * Interfaz para representar una dimensión valida.
 * Extiende `IntEntidad` y además añade:
 * `estado` y `nivel_tec`
 */
export interface IntDimensiones extends IntEntidad {
  estado: EstadoDimensiones;
  nivel_tec: Nivel;
}

/**
 * Interfaz para repesentar un personaje valido.
 * Extiende `IntEntidad` y además añade:
 * `especie`, `dim_origen`, `estado`, `afiliacion` y `nivel_inteligencia`
 */
export interface IntPersonajes extends IntEntidad {
  especie: IntEspecies;
  dim_origen: IntDimensiones;
  estado: EstadoPersonajes;
  afiliacion: AfilaicionPersonajes;
  nivel_inteligencia: Nivel;
}

/**
 * Interfaz para representar las diferentes especies validas.
 * Extiende `IntEntidad` y además añade:
 * `origen`, `tipo` y `esperanza_vida`
 */
export interface IntEspecies extends IntEntidad {
  origen: IntDimensiones | IntLocalizacion;
  tipo: TipoEspecies;
  esperanza_vida: number;
}

/**
 * Interfaz para representar las difrentes localizaciones validas.
 * Extiende `IntEntidad` y además añade:
 * `tipo` , `dimension` y `poblacion_aprox`
 */
export interface IntLocalizacion extends IntEntidad {
  tipo: TipoLocalizaciones;
  dimension: IntDimensiones;
  poblacion_aprox: number;
}

/**
 * Interfaz para representar los artefactos validos.
 * Extiende `IntEntidad` y además añade:
 * `inventor`, `tipo` y `nivel_peligrosidad`
 */
export interface IntArtefactos extends IntEntidad {
  inventor: IntPersonajes;
  tipo: TipoArtefacto;
  nivel_peligrosidad: Nivel;
}
