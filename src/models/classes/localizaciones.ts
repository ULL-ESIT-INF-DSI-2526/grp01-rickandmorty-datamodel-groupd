import { IntDimensiones, IntLocalizacion } from '../interfaces.js';
import { TipoLocalizaciones } from '../tipos.js';

/**
 * Clase para representar las diferentes localizaciones del universo
 */
export class Localizacion implements IntLocalizacion {
  public id: string;

  /**
   * Set de ids únicos que fueron registrados
   */
  private static ids_registrados = new Set<string>();

  /**
   * Constructor de la clase
   *
   * @param new_id - Id de la localizacion (debe ser único)
   * @param nombre - Nombre de la localizacion
   * @param tipo - Tipo de la localización
   * @param dimension - Dimensión donde se encuentra
   * @param poblacion_aprox - Población aproximada
   * @param descripcion - Más detalles de la localización
   *
   * El constructor comprueba que el id sea valido. Para ello emplea la función `validId`.
   */
  constructor(
    new_id: string,
    public nombre: string,
    public tipo: TipoLocalizaciones,
    public dimension: IntDimensiones,
    public poblacion_aprox: number,
    public descripcion: string,
  ) {
    this.validId(new_id);
    this.id = new_id;
    Localizacion.ids_registrados.add(new_id);
  }

  /**
   * Método para comprobar si un id está en el set global
   * @param id - Id a comprobar
   *
   * Si el id esta en el set:
   * @throws Este id (`id`) ya ha sido registrado
   */
  validId(id: string): void {
    if (Localizacion.ids_registrados.has(id))
      throw new Error(`Este id (${id}) ya ha sido registrado`);
  }

  /**
   * Método que devuelve toda la información sobre la localización
   * @returns Un string con toda la información
   *
   * @example
   * [12345] Sector 7-G esta en la dimensión Cronenberg.
   * Es de tipo Dimensión de bolsillo y tiene una población aproximada de 24000.
   * Más información: Contiene gases toxicos
   */

  info(): string {
    return `[${this.id}] ${this.nombre} esta en la dimensión ${this.dimension.nombre}.\nEs de tipo ${this.tipo} y tiene una población aproximada de ${this.poblacion_aprox}.\nMás información: ${this.descripcion}`;
  }
}
