import { IntDimensiones, IntEspecies, IntPersonajes } from '../interfaces.js';
import { Nivel } from '../niveles.js';
import { AfilaicionPersonajes, EstadoPersonajes } from '../tipos.js';

export class Personaje implements IntPersonajes {
  public id: string;

  private static ids_registrados = new Set<string>();
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

  ValidId(id: string): void {
    if (Personaje.ids_registrados.has(id))
      throw new Error(`Este id (${id}) ya ha sido registrado`);
  }

  info(): string {
    return `[${this.id}] ${this.nombre} esta ${this.estado} y es de ${this.dim_origen.nombre}.\nSu especie es ${this.especie.nombre} y está afiliado a ${this.afiliacion}.\nDispone de un nivel de inteligencia de ${this.nivel_inteligencia.nivel}\nMás información: ${this.descripcion}`;
  }
}
