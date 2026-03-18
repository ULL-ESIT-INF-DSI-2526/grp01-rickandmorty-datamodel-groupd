import {
  EstadoDimensiones,
  EstadoPersonajes,
  TipoArtefacto,
  TipoEspecies,
  TipoLocalizaciones,
  AfilaicionPersonajes,
} from './tipos.js';

export interface IntDimensiones {
  id: string;
  nombre: string;
  estado: EstadoDimensiones;
  nivel_tec: number;
  descripcion: string;
}

export interface IntPersonajes {
  id: string;
  nombre: string;
  especie: IntEspecies;
  dim_origen: IntDimensiones;
  estado: EstadoPersonajes;
  afiliacion: AfilaicionPersonajes;
  nivel_inteligencia: number;
  descripcion: string;
}
