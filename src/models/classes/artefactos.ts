import { IntArtefactos, IntPersonajes } from '../interfaces.js';
import { Nivel } from '../niveles.js';
import { TipoArtefacto } from '../tipos.js';

/**
 * Clase para representar los diferentes artefactos del universo
 */
export class Artefacto implements IntArtefactos {
  public id: string;

  /**
   * Set de ids únicos de la clase
   */
  private static ids_registrados = new Set<string>();

  /**
   * Constructor de la clase
   *
   * @param new_id - Id del artefacto
   * @param nombre - Nombre del artefacto
   * @param inventor - Referencia al `Personaje` inventor del artefacto
   * @param tipo - Tipo del artefacto
   * @param nivel_peligrosidad - `Nivel` de peligrosidad del artefacto
   * @param descripcion - Más información sobre el artefacto
   *
   * El constructor comprueba que el id sea valido. Para ello emplea la función `validId`.
   */
  constructor(
    new_id: string,
    public nombre: string,
    public inventor: IntPersonajes,
    public tipo: TipoArtefacto,
    public nivel_peligrosidad: Nivel,
    public descripcion: string,
  ) {
    this.validId(new_id);
    this.id = new_id;
    Artefacto.ids_registrados.add(new_id);
  }

  /**
   * Método para comprobar si un id está en el set global
   * @param id - Id a comprobar
   *
   * Si el id esta en el set:
   * @throws Este id (`id`) ya ha sido registrado
   */
  validId(id: string): void {
    if (Artefacto.ids_registrados.has(id))
      throw new Error(`Este id (${id}) ya ha sido registrado`);
  }

  /**
   * Método que devuelve toda la información del artefacto
   * @returns Un string con toda la información
   *
   * @example
   * [I-345] Megasiembra fue inventado por Morty.
   * Es de tipo Biotecnología y tiene un nivel de peligrosidad de 6.7.
   * Más información: Ayuda a los agicultores galacticos
   */
  info(): string {
    return `[${this.id}] ${this.nombre} fue inventado por ${this.inventor.nombre}.\nEs de tipo ${this.tipo} y tiene un nivel de peligrosidad de ${this.nivel_peligrosidad.nivel}.\nMás información: ${this.descripcion}`;
  }
}
