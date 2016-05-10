# selene-ui
TW Selene Fixed Asset React UI

## Usando Docker
Guía de instalación con Docker para Mac
- Instalar [docker-toolbox]

  ```sh
  $ brew cask install dockertoolbox
  ```

- Para crear la máquina, ejecutar el comando:

  ```sh
  $ docker-machine create --driver virtualbox default
  ```

  Nota: El último argumento es el nombre de la máquina

- Para conectarse con la nueva máquina, ejecutar el comando:

  ```sh
  $ eval "$(docker-machine env default)"
  ```

  Nota: Ejecutar antes para usos posteriores de docker.

- Construir imagen:

  ```sh
  $ docker build -t selene_ui .
  ```

- Correr contenedor:

  ```sh
  $ docker run -d -p 8080:8080 --name selene_ui -t selene_ui
  ```

  Nota: -d Segundo plano, -p Puerto [docker-ports]

## Comandos de ayuda
- Iniciar máquina:

  ```sh
  $ docker-machine start default
  ```

  Nota: Se debe ejecutar si se muestra el siguiente mensaje "Error checking TLS connection: Host is not running"

- Mostrar el listado de máquinas:

  ```sh
  $ docker-machine ls
  ```

- Obtener el IP de la máquina:​

  ```sh
  $ docker-machine ip default
  ```

- Iniciar contenedor:​

  ```sh
  $ docker start selene_ui
  ```

- Detener contenedor:​

  ```sh
  $ docker stop selene_ui
  ```

- Eliminar contenedor:​

  ```sh
  $ docker rm -f selene_ui
  ```

- Listar contenedores:

  ```sh
  $ docker ps -a
  ```

- Ver puertos:

  ```sh
  $ docker port selene_ui
  ```

- Abrir consola de contenedor:

  ```sh
  $ docker exec -it selene_ui /bin/bash
  ```

- Detectar si esta respondiendo el server:

  Probar por curl:

  ```sh
  $ curl -i IP:8080
  ```

  Probar con telnet:

  ```sh
  $ telnet IP 8080
  ```


[docker-toolbox]: (https://www.docker.com/products/docker-toolbox/)
[docker-ports]: (https://docs.docker.com/engine/installation/mac/#access-container-ports)


##NPM

- Instalar node y nvm
```sh
$ brew install node
$ npm install -g nvm
```
Verificar la versión instalada
```sh
$ node --version
```

Descargar e instalar la versión de NVM
```sh
$ nvm download 4.4.4
$ nvm build 4.4.4
$ nvm install 4.4.4
```

Instalar las dependencias de nuestra aplicación

Dentro del directorio ```selene-ui``` ejecuta

```
npm install
npm start
```
