import { IntDimensiones } from '../interfaces.js';
import { Nivel } from '../niveles.js';
import { EstadoDimensiones } from '../tipos.js';

/**
 * Clase concreta para representar las dimensiones
 */
export class Dimension implements IntDimensiones {
  public id: string;

  /**
   * Set que almacena todos los ids para comprobar que sean únicos.
   */
  private static ids_registrados = new Set<string>();

  /**
   * Constructor de la clase
   *
   * @param new_id - Id de la dimensión (formato adecuado)
   * @param nombre - Nombre de la dimensión
   * @param estado - Estado de la dimensión
   * @param nivel_tec - Nivel de tecnología (1-10)
   * @param descripcion - Otros detalles sobre la dimensión
   *
   * El constructor comprueba que el id sea valido. Para ello emplea la función `validId`.
   */
  constructor(
    new_id: string,
    public nombre: string,
    public estado: EstadoDimensiones,
    public nivel_tec: Nivel,
    public descripcion: string,
  ) {
    this.validId(new_id);
    this.id = new_id;
    Dimension.ids_registrados.add(new_id);
  }

  /**
   * Método para comprobar si un id está en el set global y si tiene el formato adecuado
   * @param id - Id a comprobar
   *
   * Si el id esta en el set:
   * @throws Este id (`id`) ya ha sido registrado
   *
   * Si el id no tiene formato adecuedo. Una letra mayuscula seguida por un guión y caracteres alfanuméricos:
   * @throws Este id (`id`) tiene un formato invalido
   */
  validId(id: string): void {
    if (Dimension.ids_registrados.has(id))
      throw new Error(`Este id (${id}) ya ha sido registrado`);
    const regex = /^[A-Z]-?[A-Za-z0-9α-ωΑ-Ω]+$/;
    if (!regex.test(id))
      throw new Error(`Este id (${id}) tiene un formato invalido`);
  }

  /**
   * Método para imprimir la información de la dimensión
   * @returns Un string con la información.
   *
   * @example
   * [C-137] Cronenberg esta Activa y dispone de un nivel de tecnología de: 9.4.
   * Más información: Especies
   *
   */
  info(): string {
    return `[${this.id}] ${this.nombre} esta ${this.estado} y dispone de un nivel de tecnología de: ${this.nivel_tec.nivel}.\nMás información: ${this.descripcion}`;
  }
}
