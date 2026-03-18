import { Nivel } from './niveles.js';
import {
  EstadoDimensiones,
  EstadoPersonajes,
  TipoArtefacto,
  TipoEspecies,
  TipoLocalizaciones,
  AfilaicionPersonajes,
} from './tipos.js';

interface IntEntidad {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface IntDimensiones extends IntEntidad {
  estado: EstadoDimensiones;
  nivel_tec: Nivel;
}

export interface IntPersonajes extends IntEntidad {
  especie: IntEspecies;
  dim_origen: IntDimensiones;
  estado: EstadoPersonajes;
  afiliacion: AfilaicionPersonajes;
  nivel_inteligencia: Nivel;
}

export interface IntEspecies extends IntEntidad {
  origen: IntDimensiones | IntLocalizacion;
  tipo: TipoEspecies;
  esperanza_vida: number;
}

export interface IntLocalizacion extends IntEntidad {
  tipo: TipoLocalizaciones;
  dimension: IntDimensiones;
  poblacion_aprox: number;
}

export interface IntArtefactos extends IntEntidad {
  inventor: IntPersonajes;
  tipo: TipoArtefacto;
  nivel_peligrosidad: Nivel;
}
