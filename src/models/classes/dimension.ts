import { IntDimensiones } from '../interfaces.js';
import { Nivel } from '../niveles.js';
import { EstadoDimensiones } from '../tipos.js';

export class Dimension implements IntDimensiones {
  public id: string;

  private static ids_registrados = new Set<string>();
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

  validId(id: string): void {
    if (Dimension.ids_registrados.has(id))
      throw new Error(`Este id (${id}) ya ha sido registrado`);
    const regex = /^[A-Z]-?[A-Za-z0-9α-ωΑ-Ω]+$/;
    if (!regex.test(id))
      throw new Error(`Este id (${id}) tiene un formato invalido`);
  }

  info(): string {
    return `[${this.id}] ${this.nombre} esta ${this.estado} y dispone de un nivel de tecnología de: ${this.nivel_tec.nivel}.\nMás información: ${this.descripcion}`;
  }
}
