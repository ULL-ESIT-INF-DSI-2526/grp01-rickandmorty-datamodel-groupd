/**
 * Enum que representa los diferentes estados en los que
 * se puede encontrar una dimesión.
 */
export enum EstadoDimensiones {
  Activa = 'Activa',
  Destruida = 'Destruida',
  Cuarentena = 'Cuarentena',
}

/**
 * Enum que representa los diferentes estados en los que
 * puede estar un personaje
 */
export enum EstadoPersonajes {
  Vivo = 'Vivo',
  Muerto = 'Muerto',
  Desconocido = 'Desconocido',
  RobotSustituto = 'Robot-sustituto',
}

/**
 * Enum para representar las afilicaiones validas para un
 * determinado personaje.
 */
export enum AfilaicionPersonajes {
  FedGalactica = 'Federación Galáctica',
  ConsejoRicks = 'Consejo de Ricks',
  Smiths = 'Familia Smith',
  Independiente = 'Independiente',
}

/**
 * Enum para ilustrar el tipo de especies
 * validas dentro del sistema
 */
export enum TipoEspecies {
  Humanoide = 'Humanoide',
  Amorfo = 'Amorfo',
  Robotico = 'Robótico',
  Parasito = 'Parásito',
  Hivermind = 'Hivermind',
}

/**
 * Enum para representar los tipos validos
 * de localizaciones
 */
export enum TipoLocalizaciones {
  Planeta = 'Planeta',
  EstacionEspacial = 'Estación Espacial',
  DimensionBolsillo = 'Dimensión de bolsillo',
  SimVirtual = 'Simulación Virtual',
}

/**
 * Enum para representar los tipo de artifactos
 */
export enum TipoArtefacto {
  Arma = 'Arma',
  DispositivoViaje = 'Dispositivo de viaje',
  Biotecnologia = 'Biotecnología',
  ObjetoAbsurdo = 'Objeto cotidiano absurdo',
}
