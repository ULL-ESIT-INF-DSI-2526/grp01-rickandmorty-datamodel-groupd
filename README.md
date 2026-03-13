# Proyecto grupal 1 - Rick & Morty

**Asignatura:** Desarrollo de Sistemas Informáticos  
**Alumnos:** Pablo Pérez Hernández, Diego Prieto González y Eduardo Zúñiga Alarcó
**Correo:** [alu0101619002@ull.edu.es], [alu0101478340@ull.edu.es] y [alu0101637853@ull.edu.es]


# 🌌 Gestor del Multiverso - Rick & Morty

Sistema interactivo por línea de comandos (CLI) desarrollado en **TypeScript** para catalogar y gestionar la infinita y abrumadora cantidad de información del multiverso: dimensiones, personajes, especies, localizaciones y los peligrosos inventos de Rick Sánchez.

## 🚀 Requisitos Previos

Asegúrate de tener instalado en tu sistema:
* [Node.js](https://nodejs.org/) (v16 o superior)
* npm (incluido con Node.js)

## 🛠️ Instalación y Configuración

Sigue estos pasos para levantar el entorno de desarrollo local:

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd nombre-del-proyecto

```

2. **Instalar dependencias:**
```bash
npm install

```

*(Esto instalará TypeScript, `prompts` y cualquier otra librería necesaria como `chalk` para los colores).*

## 💻 Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

* `npm run dev` : Inicia la aplicación en modo desarrollo (usando `ts-node` o similar) sin necesidad de compilar manualmente.
* `npm run build` : Compila el código TypeScript a JavaScript en la carpeta `dist/` o `build/`.
* `npm start` : Ejecuta la versión ya compilada de la aplicación en producción.

## 📂 Estructura del Proyecto

El código sigue una arquitectura separada por responsabilidades para facilitar el trabajo cooperativo:

```text
src/
 ├── models/       # Interfaces y Clases (Personaje, Dimension, Invento...)
 ├── data/         # Archivos de datos iniciales (JSON o arrays en memoria)
 ├── manager/      # GestorMultiverso.ts (Lógica central, CRUD y reportes)
 ├── cli/          # Menús interactivos usando la librería 'prompts'
 └── index.ts      # Punto de entrada principal de la aplicación
 ```

*Wubba lubba dub dub!* 🛸