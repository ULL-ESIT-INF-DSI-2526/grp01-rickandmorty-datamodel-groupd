import { almacen } from '../../data/alamacen.js';
import { Dimension } from './dimension.js';
import { Artefacto } from './artefactos.js';
import { Personaje } from './personajes.js';
import { Especies } from './especie.js';
import {
  IntDimensiones,
  IntPersonajes,
  IntEspecies,
  IntLocalizacion,
  IntArtefactos,
} from '../interfaces.js';
import { EstadoPersonajes, TipoArtefacto } from '../tipos.js';
import { Localizacion } from './localizaciones.js';
import { nivelValue } from '../../cli/utils/printer.js';

/**
 * Clase GestorMultiverso
 */
export class GestorMultiverso {
  /**
   * Constructor de la clase
   */
  constructor() {}

  private get data() {
    return almacen.data!;
  }

  /**
   * Obtiene todas las dimensiones registradas en el multiverso
   * @returns Un array con todas las dimensiones (copia superficial)
   */
  public getAllDimensions(): IntDimensiones[] {
    return [...this.data.dimensiones];
  }

  /**
   * Añade una nueva dimension
   * @param newDim - Objeto que debe cumplir con la interfaz IntDimensiones
   * @throws Error - si el ID ya existe en la base de datos
   */
  public async addDimension(newDim: IntDimensiones): Promise<void> {
    if (this.data.dimensiones.find((d) => d.id === newDim.id)) {
      throw new Error(`Error: dimension con ID '${newDim.id}' ya registrada`);
    }
    this.data.dimensiones.push(newDim as Dimension);
    await almacen.write();
  }

  /**
   * Actualiza los datos de una dimension existente
   * @param id - El identificador
   * @param dimensionActualizada - Un objeto con los nuevos datos
   * @throws Error si el ID original no existe en la base de datos
   */
  public async updateDimension(
    id: string,
    dimensionActualizada: IntDimensiones,
  ): Promise<void> {
    const index = this.data.dimensiones.findIndex((d) => d.id === id);
    if (index === -1) {
      throw new Error(`La dimension con ID '${id}' no existe`);
    }
    if (id !== dimensionActualizada.id) {
      if (this.data.dimensiones.some((d) => d.id === dimensionActualizada.id)) {
        throw new Error(
          `El nuevo ID '${dimensionActualizada.id}' ya esta en uso`,
        );
      }
      // Actualizar id para los personajes de la dimension
      this.data.personajes.forEach((p) => {
        if (p.dim_origen.id === id) {
          p.dim_origen.id = dimensionActualizada.id;
        }
      });
    }
    this.data.dimensiones[index] = dimensionActualizada as Dimension;
    await almacen.write();
  }

  /**
   * Elimina una dimension
   */
  public async removeDimension(id: string): Promise<void> {
    const dimIndex = this.data.dimensiones.findIndex((d) => d.id === id);
    if (dimIndex === -1) throw new Error('Dimension no existente');
    this.data.dimensiones.splice(dimIndex, 1);

    // Personajes de esa dimension pasan a ser desconocidos y sin origen
    this.data.personajes.forEach((p) => {
      if (p.dim_origen.id === id) {
        p.estado = EstadoPersonajes.Desconocido;
        p.dim_origen.nombre = 'Destruida';
        p.dim_origen.id = 'NULL';
        p.descripcion += ' [AVISO: Dimension de origen destruida] ';
      }
    });
    await almacen.write();
  }

  /**
   * Obtiene todos los artefactos registrados.
   */
  public getAllArtifacts(): IntArtefactos[] {
    return [...this.data.artefactos];
  }

  /**
   * Añade un nuevo artefacto
   */
  public async addArtifact(newArtifact: IntArtefactos): Promise<void> {
    if (this.data.artefactos.some((a) => a.id === newArtifact.id)) {
      throw new Error(`El artefacto con ID '${newArtifact.id}' ya existe`);
    }
    if (!this.data.personajes.some((p) => p.id === newArtifact.inventor.id)) {
      throw new Error(
        `No se puede añadir: El inventor '${newArtifact.inventor.nombre}' no esta registrado`,
      );
    }
    this.data.artefactos.push(newArtifact as Artefacto);
    await almacen.write();
  }

  /**
   * Actualiza un artefacto existente.
   */
  public async updateArtifact(
    id: string,
    updatedArtifact: IntArtefactos,
  ): Promise<void> {
    const index = this.data.artefactos.findIndex((a) => a.id === id);
    if (index === -1) throw new Error(`Artefacto '${id}' no encontrado`);

    if (
      id !== updatedArtifact.id &&
      this.data.artefactos.some((a) => a.id === updatedArtifact.id)
    ) {
      throw new Error('El nuevo ID ya esta en uso por otro artefacto');
    }
    this.data.artefactos[index] = updatedArtifact as Artefacto;
    await almacen.write();
  }

  /**
   * Elimina un artefacto del sistema.
   */
  public async deleteArtifact(id: string): Promise<void> {
    const index = this.data.artefactos.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('ID no encontrado');

    this.data.artefactos.splice(index, 1);
    await almacen.write();
  }

  public getAllCharacters(): IntPersonajes[] {
    return [...this.data.personajes];
  }

  public async addCharacter(newCharacter: IntPersonajes): Promise<void> {
    if (this.data.personajes.some((p) => p.id === newCharacter.id)) {
      throw new Error(`El personaje con ID '${newCharacter.id}' ya existe`);
    }
    if (
      !this.data.dimensiones.some((d) => d.id === newCharacter.dim_origen.id)
    ) {
      throw new Error(
        `Error: La dimension '${newCharacter.dim_origen.nombre}' no esta registrada`,
      );
    }
    this.data.personajes.push(newCharacter as Personaje);
    await almacen.write();
  }

  public async updateCharacter(
    id: string,
    updatedCharacter: IntPersonajes,
  ): Promise<void> {
    const index = this.data.personajes.findIndex((l) => l.id === id);
    if (index === -1) throw new Error(`Personaje '${id}' no encontrada`);

    if (
      id !== updatedCharacter.id &&
      this.data.personajes.some((l) => l.id === updatedCharacter.id)
    ) {
      throw new Error('El nuevo ID de personaje ya esta en uso');
    }

    this.data.personajes[index] = updatedCharacter as Personaje;
    await almacen.write();
  }

  public async deleteCharacter(id: string): Promise<void> {
    const index = this.data.personajes.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`El personaje con ID '${id}' no existe`);
    }
    this.data.artefactos.forEach((art) => {
      if (art.inventor.id === id) {
        art.descripcion += ' [AVISO: Inventor eliminado] ';
      }
    });
    this.data.personajes.splice(index, 1);
    await almacen.write();
  }

  public getAllLocations(): IntLocalizacion[] {
    return [...this.data.localizaciones];
  }

  public async addLocation(newLocation: IntLocalizacion): Promise<void> {
    if (this.data.localizaciones.some((l) => l.id === newLocation.id)) {
      throw new Error(`La localizacion con ID '${newLocation.id}' ya existe.`);
    }
    if (!this.data.dimensiones.some((d) => d.id === newLocation.dimension.id)) {
      throw new Error(
        `Error: La dimension '${newLocation.dimension.nombre}' no existe en el registro`,
      );
    }
    this.data.localizaciones.push(newLocation as Localizacion);
    await almacen.write();
  }

  public async updateLocation(
    id: string,
    updatedLocation: IntLocalizacion,
  ): Promise<void> {
    const index = this.data.localizaciones.findIndex((l) => l.id === id);
    if (index === -1) throw new Error(`Localizacion '${id}' no encontrada`);

    if (
      id !== updatedLocation.id &&
      this.data.localizaciones.some((l) => l.id === updatedLocation.id)
    ) {
      throw new Error('El nuevo ID de localizacion ya esta en uso');
    }

    this.data.localizaciones[index] = updatedLocation as Localizacion;
    await almacen.write();
  }

  public async deleteLocation(id: string): Promise<void> {
    const index = this.data.localizaciones.findIndex((l) => l.id === id);
    if (index === -1) throw new Error('No existe la localizacion a eliminar');
    this.data.localizaciones.splice(index, 1);
    await almacen.write();
  }

  /**
   * Registra el movimiento de un personaje entre dimensiones
   * @param IdPersonaje ID del viajero
   * @param IdDestino ID de la dimension de llegada
   * @param motivo Razon del viaje (ej: "Escapar de la Ciudadela")
   */
  public async registrarViaje(
    IdPersonaje: string,
    IdDestino: string,
    motivo: string,
  ): Promise<void> {
    const personaje = this.data.personajes.find((p) => p.id === IdPersonaje);
    const destino = this.data.dimensiones.find((d) => d.id === IdDestino);

    if (!personaje) throw new Error(`El personaje '${IdPersonaje}' no existe`);
    if (!destino)
      throw new Error(`La dimension destino '${IdDestino}' no existe`);

    const origenId = personaje.dim_origen.id;
    personaje.localizacion = destino;

    almacen.data.regEventos.push({
      fecha: new Date(),
      descripcion: `Viaje registrado: ${personaje.nombre} ha saltado de ${this.data.dimensiones.find((d) => d.id === origenId)!.nombre} a ${destino.nombre}`,
    });
    await almacen.write();
  }

  public getAllSpecies(): IntEspecies[] {
    return [...this.data.especies];
  }

  public async addSpecies(newSpecies: IntEspecies): Promise<void> {
    if (this.data.especies.some((e) => e.id === newSpecies.id)) {
      throw new Error(`La especie con ID '${newSpecies.id}' ya existe.`);
    }
    if (!this.data.dimensiones.some((d) => d.id === newSpecies.origen.id)) {
      throw new Error(`El origen '${newSpecies.origen.nombre}' no existe.`);
    }
    this.data.especies.push(newSpecies as Especies);
    await almacen.write();
  }

  public async updateSpecies(
    id: string,
    updatedSpecies: IntEspecies,
  ): Promise<void> {
    const index = this.data.especies.findIndex((e) => e.id === id);
    if (index === -1) throw new Error(`Especie '${id}' no encontrada.`);
    if (
      id !== updatedSpecies.id &&
      this.data.especies.some((e) => e.id === updatedSpecies.id)
    ) {
      throw new Error('El nuevo ID de especie ya esta registrado.');
    }
    this.data.especies[index] = updatedSpecies as Especies;
    await almacen.write();
  }

  public async deleteSpecies(id: string): Promise<void> {
    const index = this.data.especies.findIndex((e) => e.id === id);
    if (index === -1) throw new Error('No existe la especie a eliminar');
    const personajesAfectados = this.data.personajes.filter(
      (p) => p.especie.id === id,
    );
    if (personajesAfectados.length > 0) {
      console.warn(
        `AVISO: Estas eliminando la especie '${id}', pero hay ${personajesAfectados.length} personajes que pertenecen a ella.`,
      );
    }
    this.data.especies.splice(index, 1);
    await almacen.write();
  }

  /**
   * Filtra personajes bajo multiples criterios
   * @param filtros - Filtros posibles de busqueda
   */
  public buscarPersonajes(
    filtros: Partial<{
      nombre: string;
      especie: string;
      afiliacion: string;
      estado: EstadoPersonajes;
      dimension: string;
    }>,
  ): IntPersonajes[] {
    let resultados = [...this.data.personajes];
    if (filtros.nombre)
      resultados = resultados.filter((p) =>
        p.nombre.toLowerCase().includes(filtros.nombre!.toLowerCase()),
      );
    if (filtros.especie)
      resultados = resultados.filter(
        (p) => p.especie.nombre === filtros.especie,
      );
    if (filtros.afiliacion)
      resultados = resultados.filter(
        (p) => p.afiliacion === filtros.afiliacion,
      );
    if (filtros.estado)
      resultados = resultados.filter((p) => p.estado === filtros.estado);
    if (filtros.dimension)
      resultados = resultados.filter(
        (p) => p.dim_origen.nombre === filtros.dimension,
      );
    return resultados;
  }

  public buscarArtefactos(
    filtros: Partial<{
      nombre: string;
      inventor: string;
      tipo: TipoArtefacto;
      peligrosidadMinima: number;
      peligrosidad: number;
    }>,
  ): IntArtefactos[] {
    let resultados = [...this.data.artefactos];
    if (filtros.nombre)
      resultados = resultados.filter((p) =>
        p.nombre.toLowerCase().includes(filtros.nombre!.toLowerCase()),
      );
    if (filtros.inventor)
      resultados = resultados.filter((a) =>
        a.inventor.nombre
          .toLowerCase()
          .includes(filtros.inventor!.toLowerCase()),
      );
    if (filtros.tipo)
      resultados = resultados.filter((a) => a.tipo === filtros.tipo);
    if (filtros.peligrosidadMinima)
      resultados = resultados.filter(
        (a) => nivelValue(a.nivel_peligrosidad) >= filtros.peligrosidadMinima!,
      );
    if (filtros.peligrosidad !== undefined)
      resultados = resultados.filter(
        (a) => nivelValue(a.nivel_peligrosidad) === filtros.peligrosidad,
      );
    return resultados;
  }

  public localizarVersionesAlternativas(nombre: string): IntPersonajes[] {
    const target = nombre.trim().toLowerCase();
    if (!target) return [];

    const coincidencias = this.data.personajes.filter(
      (p) => p.nombre.trim().toLowerCase() === target,
    );

    if (coincidencias.length <= 1) {
      return [];
    }

    return coincidencias;
  }
}
