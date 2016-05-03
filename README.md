# selene-ui
TW Selene Fixed Asset React UI


### Usando Docker

Guía de instalación con Docker para Mac

* Instalar [docker toolbox]
```sh
  $ brew cask install dockertoolbox
```
* Para crear la máquina, ejecutar el comando:
```sh
  $ docker-machine create --driver virtualbox default
```
  Nota: El último argumento es el nombre de la máquina
* Para conectarse con la nueva máquina, ejecutar el comando:
```sh  
  eval "$(docker-machine env default)"
```
  Nota: Ejecutar antes para usos posteriores de docker.

* Construir contenedor:
```sh
docker build -t selene_ui .
```

* Correr contenedor:
```sh
docker run -d -t selene_ui
```

### Comandos de ayuda

* Iniciar máquina:
  ```sh
    $ docker-machine start default
  ```
  Nota: Se debe ejecutar si se muestra el siguiente mensaje "Error checking TLS connection: Host is not running"

*  Mostrar el listado de máquinas:
  ```sh
    $ docker-machine ls
  ```
* Obtener el IP de la máquina:​
  ```sh
    $ docker-machine ip default
  ```
* Conectarse:
  ```sh
    $ docker run -it busybox sh
  ```
### Referencias
https://docs.docker.com/machine/get-started/
