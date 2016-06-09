# selene-ui
TW Selene Fixed Asset React UI

## Tech Stack

- Node (https://nodejs.org/en)
- React (https://facebook.github.io/react)
- Test: Sinon (http://sinonjs.org), Mocha (https://mochajs.org), Enzyme (https://github.com/airbnb/enzyme)
- Webpack (https://webpack.github.io)
- Babel (https://babeljs.io)
- Bootstrap (http://getbootstrap.com)
- Sass (scss) (http://sass-lang.com)
- ES6 (http://es6-features.org)

## Instalación de Node

- Instalar node y nvm:

  ```sh
  $ brew install node
  $ npm install -g nvm
  ```

- Verificar la versión instalada:

  ```sh
  $ node --version
  ```

- Descargar e instalar la versión de Node con nvm:

  ```sh
  $ nvm download 4.4.4
  $ nvm build 4.4.4
  $ nvm install 4.4.4
  ```

## Instalación de la aplicación

- Configuración de variables de entorno necesarias (env.example):

  ```sh
  $ export HOST=0.0.0.0
  $ export PORT=8080
  $ export BACKEND_URL=http://127.0.0.1:8000
  ```

- Instalar dependencias:
Luego de clonar el proyecto, dentro del directorio ```selene-ui``` ejecutar:

  ```sh
  $ npm install
  ```

## Ejecución de pruebas

- Pruebas unitarias:

  ```sh
  $ npm test
  ```

- Pruebas de contrato:

  ```sh
  $ npm run contract
  ```

## Generar estáticos

```sh
$ npm run build
```

## Ejecución en desarrollo

```sh
$ npm start
```

## Estructura de carpetas

- **Pipeline**:

  Los archivos asociados al CI se encuentran en la carpeta ```pipeline```, el archivo ```deploy.sh``` ayuda en el despliegue a producción.

- **Activos**:

  La carpeta ```src/assets``` esta destinada para archivos como imágenes y fuentes.

- **Estílos**:

  La carpeta ```src/styles``` almacena los estílos scss.

- **Constantes**:

  Usar el archivo ```src/config/Constants.js```, para declarar las constantes globales. Ejemplo de uso:

  ```javascript
  import Constants from './../config/Constants';
  console.log(Constants.BACKEND_URL);
  ```

- **Rutas**:

  Usar el archivo ```src/config/routes.js```, para especificar la ruta de nuevos componentes.

- **Pruebas de Contrato**:

  La carpeta ```spec/contract``` almacena las pruebas de contrato, el archivo ```schemas.js``` contiene las especificaciones para las validaciones de las respuestas.

- **Pruebas unitarias**:

  Usar la carpeta ```spec/componentes``` para escribir las pruebas unitarias.

- **Componentes**:

  Los componentes genéricos específicos para el layout se encuentran en la carpeta ```src/components/layout```, los helpers en ```src/components/helpers```, los demás en ```src/components```.

- **Dependencias**:

  Archivo ```package.json```.

- **Configuración de Webpack**:

  Archivo ```webpack.config.js```.

- **Configuración de babel para ES6 y jsx**:

  Archivo ```mochacfg.js```.
