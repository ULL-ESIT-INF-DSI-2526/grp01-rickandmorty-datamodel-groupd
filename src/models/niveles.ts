export class Nivel {
  private readonly _nivel: number;
  constructor(nv: number) {
    if (nv < 1 || nv > 10) throw new Error('El nivel debe estar entre 1 y 10');
    this._nivel = nv;
  }

  get nivel(): number {
    return this._nivel;
  }
}
