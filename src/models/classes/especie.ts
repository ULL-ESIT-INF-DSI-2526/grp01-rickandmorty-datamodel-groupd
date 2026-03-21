import { IntDimensiones, IntEspecies, IntLocalizacion } from '../interfaces.js';
import { TipoEspecies } from '../tipos.js';

/**
 * Clase concreta para representar las especies
 */
export class Especies implements IntEspecies {
  public id: string;

  /**
   * Set que almacena todos los ids para comprobar que sean únicos.
   */
  private static ids_registrados = new Set<string>();
  /**
   * Constructor de la clase
   *
   * @param new_id - Id de la especie (debe ser único)
   * @param nombre - Nombre de la especie
   * @param descripcion - Más información de la especie
   * @param origen - Origen (Localización o Dimensión) de la especie
   * @param tipo - Tipo de especie
   * @param esperanza_vida - Esperanza de vida media en años humanos
   *
   * El constructor comprueba que el id sea valido. Para ello emplea la función `validId`.
   */
  constructor(
    new_id: string,
    public nombre: string,
    public descripcion: string,
    public origen: IntLocalizacion | IntDimensiones,
    public tipo: TipoEspecies,
    public esperanza_vida: number,
  ) {
    this.ValidId(new_id);
    this.id = new_id;
    Especies.ids_registrados.add(new_id);
  }

  /**
   * Método que comprueba si la id ya está en la colección
   * @param id - Id a comprobar su validez
   *
   * Si el id está en el set:
   * @throws Este id (`id`) ya ha sido registrado
   */
  ValidId(id: string): void {
    if (Especies.ids_registrados.has(id))
      throw new Error(`Este id (${id}) ya ha sido registrado`);
  }

  /**
   * Método para imprimir la información de la especie
   * @returns Un string con la información.
   *
   * @example
   * [E-14] Ratadragones es originaria de Cronenberg es de tipo Amorfo.
   * Tiene una esperanza de vida media de 3 años humanos.
   * Más información: Lanza fuego
   *
   */
  info(): string {
    return `[${this.id}] ${this.nombre} es originaria de ${this.origen.nombre} es de tipo ${this.tipo}.\nTiene una esperanza de vida media de ${this.esperanza_vida} años humanos.\nMás información: ${this.descripcion}`;
  }
}
