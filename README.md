# LaSobremesa — Backend

<p align="center">
  <img src="./docs/logo.svg" alt="LaSobremesa" width="250">
</p>

API REST desarrollada con **NestJS y TypeScript** para el ecommerce LaSobremesa, orientado a la comercialización de productos artesanales de proveedores locales.

El backend se organiza en módulos de negocio que contemplan productos, categorías, proveedores, stock, usuarios, direcciones, carrito, pedidos, reseñas y suscripciones.

## Contenidos

1. [Tecnologías](#tecnologías)
2. [Requisitos previos](#requisitos-previos)
3. [Instalación](#instalación)
4. [Configuración](#configuración)
5. [Ejecución en desarrollo](#ejecución-en-desarrollo)
6. [Ejecución en producción](#ejecución-en-producción)
7. [Documentación de la API](#documentación-de-la-api)
8. [Estructura del proyecto](#estructura-del-proyecto)
9. [Flujo de trabajo](#flujo-de-trabajo)
10. [Estado del proyecto](#estado-del-proyecto)
11. [Contacto](#contacto)

## 1. Tecnologías

- **Node.js:** entorno de ejecución de JavaScript.
- **TypeScript:** lenguaje utilizado para desarrollar la aplicación.
- **NestJS:** framework para construir la API REST.
- **Swagger:** documentación interactiva de los endpoints.
- **Docker:** contenedorización de la aplicación.
- **Docker Compose:** orquestación de la API y MySQL.
- **MySQL 8:** motor de base de datos previsto para el proyecto.

## 2. Requisitos previos

Antes de ejecutar el proyecto, asegúrate de contar con las siguientes herramientas, según la modalidad de ejecución que utilices.

### Herramientas para ejecución local

- [Git](https://git-scm.com/): para clonar el repositorio y gestionar las versiones del código.
- [Node.js](https://nodejs.org/): entorno de ejecución necesario para la aplicación NestJS.
- [npm](https://www.npmjs.com/): gestor de paquetes utilizado para instalar las dependencias del proyecto. Se incluye con Node.js.
- [NestJS CLI](https://docs.nestjs.com/cli/overview): interfaz de línea de comandos para generar módulos, controladores, servicios y otros componentes de NestJS.

Para instalar NestJS CLI globalmente, ejecuta:

    npm install -g @nestjs/cli

Puedes comprobar que está disponible con:

    nest --version

### Herramientas para ejecución con Docker

- [Docker Engine o Docker Desktop](https://docs.docker.com/get-docker/): para construir y ejecutar los contenedores.
- [Docker Compose](https://docs.docker.com/compose/): para gestionar los servicios definidos en los archivos Compose.

Para la ejecución local no es necesario tener Docker instalado. Si ejecutas la aplicación mediante Docker, no necesitas instalar Node.js, npm ni NestJS CLI directamente en tu equipo para ejecutar la API.

Se recomienda verificar que las herramientas correspondientes estén instaladas y funcionando antes de continuar con la instalación.

## 3. Instalación

Clona el repositorio y accede al directorio del proyecto:

    git clone https://github.com/bootcamp-uchile-2026/grupo-4-backend.git
    cd grupo-4-backend

Crea el archivo de variables de entorno a partir de la plantilla:

    .env.example

Revisa el archivo `.env` y configura los valores correspondientes antes de iniciar los servicios.

## 4. Configuración

La aplicación utiliza variables de entorno para configurar el puerto de la API, la imagen Docker y los parámetros de MySQL.

| Variable | Descripción |
|---|---|
| `PORT` | Puerto interno de la API. |
| `DOCKER_IMAGE` | Nombre y etiqueta de la imagen publicada en Docker Hub. |
| `MYSQL_HOST` | Host de MySQL. En Docker Compose se utiliza `mysql`. |
| `MYSQL_PORT` | Puerto de MySQL para conexiones desde el entorno local. |
| `MYSQL_DATABASE` | Nombre de la base de datos. |
| `MYSQL_USER` | Usuario de la base de datos. |
| `MYSQL_PASSWORD` | Contraseña del usuario de la base de datos. |
| `MYSQL_ROOT_PASSWORD` | Contraseña del usuario administrador de MySQL. |

Completa las variables utilizando `.env.example` como referencia. Utiliza contraseñas seguras y diferentes para el usuario de aplicación y el administrador.

**Importante:** el archivo `.env` contiene configuración local y no debe subirse al repositorio. Solo se debe versionar `.env.example`, sin contraseñas reales, tokens ni otros datos sensibles.

## 5. Ejecución en desarrollo

### 5.1. Ejecución local con NestJS

Para ejecutar NestJS directamente en el entorno local, instala las dependencias:

    npm install

Luego, utiliza uno de los siguientes comandos:

    # Desarrollo con recarga automática
    npm run start:dev

    # Ejecución normal
    npm run start

    # Compilar y ejecutar en modo producción
    npm run build
    npm run start:prod

Antes de iniciar la aplicación, asegúrate de tener configuradas las variables de entorno necesarias y de que cualquier servicio externo requerido esté disponible.

### 5.2. Ejecución con Docker Compose

Desde la raíz del proyecto, ejecuta:

    docker compose up --build -d

Este comando construye la imagen de la API a partir del código local e inicia los servicios definidos en `compose.yaml`, incluyendo MySQL.

Para revisar el estado de los contenedores:

    docker compose ps

Para consultar los registros de la aplicación:

    docker compose logs -f app

Para detener los servicios:

    docker compose down

Los datos de MySQL se almacenan en un volumen de Docker para conservarlos al detener y volver a crear los contenedores.

## 6. Ejecución en producción

La configuración `compose.prod.yaml` permite ejecutar la aplicación utilizando una imagen publicada en Docker Hub, sin necesidad de construirla desde el código fuente en el servidor de producción.

### 6.1. Construir y publicar la imagen en Docker Hub

Para publicar una versión de la API, primero debes tener una cuenta en [Docker Hub](https://hub.docker.com/) e iniciar sesión desde la terminal:

    docker login

Construye la imagen desde la raíz del proyecto. Reemplaza `usuario-dockerhub` por tu usuario de Docker Hub y utiliza el nombre del repositorio que quieras publicar:

    docker build -t usuario-dockerhub/nombre-imagen:latest .

Publica la imagen:

    docker push usuario-dockerhub/nombre-imagen:latest

Asegúrate de que el repositorio de Docker Hub tenga la visibilidad apropiada para el entorno donde se ejecutará. Si la imagen es privada, será necesario autenticarse desde el servidor de producción.

### 6.2. Configurar la imagen

En el archivo `.env`, configura la variable `DOCKER_IMAGE` con el nombre completo de la imagen que publicaste:

    DOCKER_IMAGE=usuario-dockerhub/nombre-imagen:latest

Sustituye el ejemplo por el nombre real de tu imagen y su etiqueta.

No es necesario incluir credenciales de Docker Hub en esta variable.

### 6.3. Descargar y ejecutar la imagen

Con Docker y Docker Compose instalados en el servidor, copia al entorno de producción los archivos `compose.prod.yaml` y `.env`. Configura las variables necesarias en `.env` y ejecuta:

    docker compose -f compose.prod.yaml pull

Este comando descarga la imagen indicada en `DOCKER_IMAGE`.

A continuación, inicia los servicios:

    docker compose -f compose.prod.yaml up -d

Comprueba el estado de los contenedores:

    docker compose -f compose.prod.yaml ps

Consulta los registros de la API:

    docker compose -f compose.prod.yaml logs -f app

Para detener los servicios:

    docker compose -f compose.prod.yaml down

La configuración de producción no publica el puerto de MySQL en el host. La API y la base de datos se comunican mediante la red interna creada por Docker Compose.

**Importante:** el archivo `.env` contiene configuración local y credenciales; no debe publicarse en el repositorio. Solo debe versionarse `.env.example`, sin contraseñas reales ni otros datos sensibles.

## 7. Documentación de la API

La documentación interactiva de Swagger está disponible después de iniciar la aplicación:

- **Swagger UI:** [http://localhost:3000/api](http://localhost:3000/api)

Si la aplicación se ejecuta en otro servidor, sustituye `localhost` por el nombre de host o la dirección correspondiente.

Swagger permite consultar los endpoints documentados, revisar los parámetros y visualizar los esquemas de solicitud y respuesta.

## 8. Estructura del proyecto

La estructura principal del código fuente es la siguiente:

    src/
    ├── app.controller.ts
    ├── app.module.ts
    ├── app.service.ts
    ├── main.ts
    ├── carrito/
    ├── categorias/
    ├── direcciones/
    ├── pedidos/
    ├── productos/
    ├── proveedores/
    ├── resenas/
    ├── stock/
    ├── suscripciones/
    └── usuarios/

## 9. Flujo de trabajo

El equipo utiliza Git y GitHub para organizar el desarrollo mediante ramas y Pull Requests.

### Ramas principales

- `main`: rama principal del proyecto.
- `develop`: rama de integración de los cambios del equipo.

### Desarrollo de funcionalidades y tareas técnicas

1. Actualiza tu rama local `develop`.
2. Crea una rama de trabajo específica para la tarea.
3. Implementa los cambios y realiza las verificaciones necesarias.
4. Registra los cambios mediante commits descriptivos.
5. Publica la rama en GitHub.
6. Crea un Pull Request hacia `develop`.
7. Solicita revisión y resuelve los comentarios antes de integrar los cambios.

Las ramas de trabajo deben seguir la nomenclatura acordada por el equipo, utilizando prefijos como `feature/`, `fix/`, `docs/` o `chore/`, según corresponda.

No se deben integrar cambios directamente en las ramas protegidas sin seguir el proceso de revisión establecido.

## 10. Estado del proyecto

LaSobremesa se encuentra en desarrollo. La implementación de los módulos, la lógica de negocio y la integración con la base de datos avanzan de forma incremental.


## 11. Contacto

Proyecto desarrollado por el equipo de LaSobremesa en el marco del bootcamp.

- **Repositorio:** [bootcamp-uchile-2026/grupo-4-backend](https://github.com/bootcamp-uchile-2026/grupo-4-backend)


- Camilo Díaz - Email: camilo.cdh.dev@gmail.com - GitHub: [camilo-cdh](https://github.com/camilo-cdh)
- Joaquín Pérez - Email: jperezoyarce@gmail.com - GitHub: [jota-pe-ge](https://github.com/jota-pe-ge)
- Ignacio Chávez - Email: ignacio.chr99@gmail.com - GitHub: [Ignaciochr99](https://github.com/Ignaciochr99)