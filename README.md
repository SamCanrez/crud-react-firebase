# React + Vite CRUD

CRUD 

## Prerequisites

- [Node.js > 18](https://nodejs.org) y NPM (Recomendado usar la versión [LTS](https://expo.dev))

## Dependencias base (no UI)

- [axios](https://github.com/axios/axios) para peticiones HTTP.

Estas son las dependencias principales y se puede encontrar un listado completo con versiones en el archivo package.json

#### Instalación de dependencias.

Asumiendo que se tiene instalado y corriendo un entorno NodeJS.

- Clonar este repositorio
- Instalar las dependencias de package.json (npm i o yarn i)

## Estructura de carpetas

- `src`: Aquí se encunetra todo el código principal para la aplicación
- `redux`: En esta carpeta se encuentra todo lo relacionado a redux para la persistencia de datos entre pantallas
- ## Dentro de redux se encunetra la carpeta de services
- `services`: Se encuentran las llamadas a la API para su conexión por medio de axios
- `context`: Se encunetra el archivo principal para la verificación de sesión del usuario por medio de token
- `src`: Es la capeta principal donde se encuentra los archivos principales del código, además se encuentras las demás carpetas del proyecto
- `components`: Aquí se encunetran todo los componentes para el desarrollo, se encuentran separados en relación a su función
- `pages`: Aquí se encuentran las páginas del proyecto

## Archivos importantes
- `firebase.js`: Aquí está la configuración de conexión con la bd de firebase.
- `eslint.config.js`: Aqí se encuentran las configuraciones generales de eslint en el proyecto.


## Ejecución del proyecto
Para correr el proyecto en un entorno de desarrollo se utiliza el comando 'npm run dev'

