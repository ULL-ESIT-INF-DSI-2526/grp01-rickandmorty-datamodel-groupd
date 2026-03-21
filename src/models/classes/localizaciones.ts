import { IntDimensiones, IntLocalizacion } from '../interfaces.js';
import { TipoLocalizaciones } from '../tipos.js';

export class Localizacion implements IntLocalizacion {
  public id: string;

  private static ids_registrados = new Set<string>();

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

  info(): string {
    return `[${this.id}] ${this.nombre} esta en la dimensión ${this.dimension.nombre}.\nEs de tipo ${this.tipo} y tiene una población aproximada de ${this.poblacion_aprox}.\nMás información: ${this.descripcion}`;
  }
}
