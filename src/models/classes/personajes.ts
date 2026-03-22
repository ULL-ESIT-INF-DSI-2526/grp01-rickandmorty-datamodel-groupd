import { IntDimensiones, IntEspecies, IntPersonajes } from '../interfaces.js';
import { Nivel } from '../niveles.js';
import { AfilaicionPersonajes, EstadoPersonajes } from '../tipos.js';
import { Dimension } from './dimension.js';

/**
 * Clase concreta para representar los personajes
 */
export class Personaje implements IntPersonajes {
  public id: string;
  private _localizacion: Dimension;

  /**
   * Set que almacena todos los ids para comprobar que sean únicos.
   */
  private static ids_registrados = new Set<string>();

  /**
   * Constructor de la clase
   *
   * @param new_id - Id del pensonaje (debe ser único)
   * @param nombre - Nombre del personaje
   * @param especie - Referencia a la especie del personaje
   * @param dim_origen - Dimensión de origen del personaje
   * @param estado - Estado del personaje
   * @param afiliacion - Afiliación a la que pertenece
   * @param nivel_inteligencia - Nivel de inteligencia (1-10)
   * @param descripcion - Otros datos sobre el personaje
   *
   * El constructor comprueba que el id sea valido. Para ello emplea la función `validId`.
   */
  constructor(
    new_id: string,
    public nombre: string,
    public especie: IntEspecies,
    public dim_origen: IntDimensiones,
    public estado: EstadoPersonajes,
    public afiliacion: AfilaicionPersonajes,
    public nivel_inteligencia: Nivel,
    public descripcion: string,
  ) {
    this.ValidId(new_id);
    this.id = new_id;
    Personaje.ids_registrados.add(new_id);
  }

  public get localizacion(): Dimension {
    return this.localizacion;
  }

  public set localizacion(nuevaDim: Dimension) {
    this._localizacion = nuevaDim;
  }

  /**
   * Método para comprobar si una id ya fue registrada
   * @param id - Id a comrpobar su validez
   *
   * Si la id ya está en el set:
   * @throws Este id (`id`) ya ha sido registrado
   */
  ValidId(id: string): void {
    if (Personaje.ids_registrados.has(id))
      throw new Error(`Este id (${id}) ya ha sido registrado`);
  }

  /**
   * Método para imprimir la información del personaje
   * @returns Un string con la información.
   *
   * @example
   * [1234] Morty esta Vivo y es de Cronenberg.
   * Su especie es Humano y está afiliado a Federación Galáctica.
   * Dispone de un nivel de inteligencia de 8.9
   * Más información:
   *
   */
  info(): string {
    return `[${this.id}] ${this.nombre} esta ${this.estado} y es de ${this.dim_origen.nombre}.\nSu especie es ${this.especie.nombre} y está afiliado a ${this.afiliacion}.\nDispone de un nivel de inteligencia de ${this.nivel_inteligencia.nivel}\nMás información: ${this.descripcion}`;
  }
}
