import prompts from 'prompts';
import { GestorMultiverso } from '../../models/classes/gestormultiverso.js';

export async function reportMenu(gestor: GestorMultiverso): Promise<void> {
  let back = false;
  while (!back) {
    const response = await prompts({
      type: 'select',
      name: 'option',
      message: ' Menú de Informes del Multiverso',
      choices: [
        {
          title: ' Dimensiones activas (Nivel Tec. Medio)',
          value: 'dim_activas',
        },
        {
          title: ' Personajes con más versiones alternativas',
          value: 'pers_versiones',
        },
        { title: ' Inventos más peligrosos', value: 'inv_peligrosos' },
        {
          title: ' Historial de viajes de un personaje',
          value: 'historial_viajes',
        },
        { title: ' Volver', value: 'back' },
      ],
    });

    switch (response.option) {
      case 'dim_activas':
        gestor.reporteDimensionesActivas();
        break;

      case 'pers_versiones':
        gestor.reportePersonajesMasVersiones();
        break;

      case 'inv_peligrosos':
        gestor.reporteInventosPeligrosos();
        break;

      case 'historial_viajes':
        const input = await prompts({
          type: 'text',
          name: 'nombre',
          message: 'Introduce el nombre del personaje a buscar:',
        });
        if (input.nombre) {
          gestor.reporteHistorialViajes(input.nombre);
        }
        break;

      case 'back':
        back = true;
        break;
    }
  }
}
