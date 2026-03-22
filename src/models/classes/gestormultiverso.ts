import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';
import { IntDimensiones, IntPersonajes, IntEspecies, IntLocalizacion, IntArtefactos } from '../interfaces.js';
import { EstadoPersonajes, EstadoDimensiones } from '../tipos.js';

// Estructura de la base de datos para Lowdb
export interface DatabaseSchema {
  dimensiones: IntDimensiones[];
  personajes: IntPersonajes[];
  especies: IntEspecies[];
  localizaciones: IntLocalizacion[];
  artefactos: IntArtefactos[];
  historialViajes: {
    personajeId: string;
    origenId: string;
    destinoId: string;
    motivo: string;
    fecha: string;
  }[];
}

/**
 * Clase GestorMultiverso
 */
export class GestorMultiverso {
  private db: LowSync<DatabaseSchema>;
  constructor(filePath: string = 'database.json') {
    const adapter = new JSONFileSync<DatabaseSchema>(filePath);
    this.db = new LowSync(adapter, {
      dimensiones: [],
      personajes: [],
      especies: [],
      localizaciones: [],
      artefactos: [],
      historialViajes: []
    });
    this.db.read();
  }

  /**
   * Obtiene todas las dimensiones registradas en el multiverso
   * @returns Un array con todas las dimensiones
   */
  public getAllDimensions(): IntDimensiones[] {
    if (!this.db.data || !this.db.data.dimensiones) {
      return [];
    }
    return [...this.db.data.dimensiones];
  }

  /**
   * Filtra personajes bajo multiples criterios
   * @param filtros Posibles filtros de busqueda
   * @returns lista de personajes que cumplen con la busqueda
   */
  public buscarPersonajes(
    filtros: Partial<{ nombre: string, especie: string, afiliacion: string, estado: EstadoPersonajes, dimension: string }>, ): IntPersonajes[] {
    let resultados = [...this.db.data.personajes];

    if(filtros.nombre) resultados = resultados.filter(p => p.nombre.toLowerCase().includes(filtros.nombre!.toLowerCase()));
    if(filtros.especie) resultados = resultados.filter(p => p.especie.nombre === filtros.especie);
    if(filtros.afiliacion) resultados = resultados.filter(p => p.afiliacion === filtros.afiliacion);
    if(filtros.estado) resultados = resultados.filter(p => p.estado === filtros.estado);
    if(filtros.dimension) resultados = resultados.filter(p => p.dim_origen.nombre === filtros.dimension);
    return resultados;
  }

  /**
   * Añade una nueva dimension al sistema
   * @param nuevaDimension Objeto que debe cumplir con la interfaz IntDimensiones
   * @throws Error si el ID ya existe en la base de datos
   */
  public addDimension(nuevaDimension: IntDimensiones): void {
    if(this.db.data.dimensiones.find((d) => d.id === nuevaDimension.id)) {
      throw new Error(`Error: La dimensión con ID '${nuevaDimension.id}' ya está registrada en el multiverso.`);
    }

    this.db.data.dimensiones.push(nuevaDimension);
    this.db.write();

    console.log(`Dimensión '${nuevaDimension.nombre}' (${nuevaDimension.id}) añadida con éxito.`);
  }

  /**
   * Actualiza los datos de una dimensión existente.
   * @param id El identificador de la dimensión que queremos modificar
   * @param dimensionActualizada Un objeto con los nuevos datos
   * @throws Error si el ID original no existe en la base de datos
   */
  public updateDimension(id: string, dimensionActualizada: IntDimensiones): void {
    const index = this.db.data.dimensiones.findIndex(d => d.id === id);
    if (index === -1) {
      throw new Error(`La dimension con ID '${id}' no existe`);
    }

    // Error de cambio de id de la dimension a uno ya existente
    if (id !== dimensionActualizada.id) {
      if(this.db.data.dimensiones.some(d => d.id === dimensionActualizada.id)) {
        throw new Error(`Conflicto de Realidad: El nuevo ID '${dimensionActualizada.id}' ya está ocupado.`);
      }

      // Actualizar id para los personajes de la dimension
      this.db.data.personajes.forEach(p => {
        if (p.dim_origen.id === id) {
          p.dim_origen.id = dimensionActualizada.id;
        }
      });
    }
    this.db.data.dimensiones[index] = dimensionActualizada;
    this.db.write();
    console.log(`Dimensión '${id}' actualizada correctamente.`);
  }

  /**
   * Elimina una dimension
   * @param id identificador de la dimension
   */
  public removeDimension(id: string): void {
    const dimIndex = this.db.data.dimensiones.findIndex(d => d.id === id);
    if (dimIndex === -1) throw new Error("Dimension no existente");

    this.db.data.dimensiones.splice(dimIndex, 1);

    // Personajes de esa dimension pasan a ser desconocidos y sin origen
    this.db.data.personajes.forEach(p => {
      if (p.dim_origen.id === id) {
        p.estado = EstadoPersonajes.Desconocido;
        p.dim_origen.nombre = "Destruida";
        p.dim_origen.id = "NULL";
        p.descripcion += " [AVISO: Dimension de origen destruida] ";
      }
    });

    this.db.write();
  }
}
