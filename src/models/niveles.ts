/**
 * Clase para representar un nivel en una escala del 1 al 10.
 */
export class Nivel {
  /**
   * Atributo privado para almacenar el número
   */
  private readonly _nivel: number;
  /**
   * Constructor de la clase.
   * @param nv - Nivel pasado al constructor
   *
   * Comprueba que el valor pasado esté dentro del rango 1-10, de lo contrario:
   * @throws 'El nivel debe estar entre 1 y 10'
   */
  constructor(nv: number) {
    if (nv < 1 || nv > 10) throw new Error('El nivel debe estar entre 1 y 10');
    this._nivel = nv;
  }

  /**
   * Getter del atributo nivel
   * @returns El number con el nivel
   */
  get nivel(): number {
    return this._nivel;
  }
}
