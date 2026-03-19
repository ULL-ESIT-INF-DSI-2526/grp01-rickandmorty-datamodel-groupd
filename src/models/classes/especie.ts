import { IntDimensiones, IntEspecies, IntLocalizacion } from '../interfaces.js';
import { TipoEspecies } from '../tipos.js';

export class Especies implements IntEspecies {
  public id: string;

  private static ids_registrados = new Set<string>();
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

  ValidId(id: string): void {
    if (Especies.ids_registrados.has(id))
      throw new Error(`Este id (${id}) ya ha sido registrado`);
  }

  info(): string {
    return `[${this.id}] ${this.nombre} es originaria de ${this.origen.nombre} es de tipo ${this.tipo}.\nTiene una esperanza de vida media de ${this.esperanza_vida} años humanos.\nMás información: ${this.descripcion}`;
  }
}
