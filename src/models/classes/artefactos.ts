import { IntArtefactos, IntPersonajes } from '../interfaces.js';
import { Nivel } from '../niveles.js';
import { TipoArtefacto } from '../tipos.js';

export class Artefacto implements IntArtefactos {
  public id: string;

  private static ids_registrados = new Set<string>();

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

  info(): string {
    return `[${this.id}] ${this.nombre} fue inventado por ${this.inventor.nombre}.\nEs de tipo ${this.tipo} y tiene un nivel de peligrosidad de ${this.nivel_peligrosidad.nivel}.\nMás información: ${this.descripcion}`;
  }
}
