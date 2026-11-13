# LaSobremesa — Backend

<p align="center">
  <img src="./docs/logo.svg" alt="LaSobremesa" width="250">
</p>

API REST desarrollada con **NestJS y TypeScript** para el ecommerce **LaSobremesa**, orientado a la comercialización de productos artesanales de proveedores locales.

El proyecto se organiza en módulos de negocio, utiliza **MySQL 8 y TypeORM** para la persistencia, **JWT** para autenticación y controles de acceso por roles y propiedad de recursos.

## Contenidos

1. [Tecnologías](#1-tecnologías)
2. [Requisitos previos](#2-requisitos-previos)
3. [Instalación y configuración](#3-instalación-y-configuración)
4. [Ejecución en desarrollo](#4-ejecución-en-desarrollo)
5. [Base de datos, migraciones y seeds](#5-base-de-datos-migraciones-y-seeds)
6. [Autenticación y autorización](#6-autenticación-y-autorización)
7. [Documentación de la API](#7-documentación-de-la-api)
8. [Ejecución en producción](#8-ejecución-en-producción)
9. [Estructura del proyecto](#9-estructura-del-proyecto)
10. [Flujo de trabajo](#10-flujo-de-trabajo)
11. [Estado del proyecto](#11-estado-del-proyecto)
12. [Contacto](#12-contacto)

## 1. Tecnologías

- **Node.js y TypeScript:** entorno y lenguaje de desarrollo.
- **NestJS 11:** framework de la API REST.
- **MySQL 8:** base de datos relacional.
- **TypeORM:** entidades, repositorios y migraciones.
- **JWT (`@nestjs/jwt`):** autenticación basada en tokens.
- **Argon2:** hash de contraseñas.
- **class-validator y class-transformer:** validación y transformación de datos de entrada.
- **Swagger (`@nestjs/swagger`):** documentación interactiva de la API.
- **Docker y Docker Compose:** ejecución de la API y MySQL en contenedores.

## 2. Requisitos previos

Para trabajar **con Docker**:

- Git.
- Docker Engine o Docker Desktop.
- Docker Compose.

Para ejecutar la API **directamente en el equipo**:

- Git.
- Node.js y npm.
- Una instancia de MySQL accesible.

NestJS CLI está disponible como dependencia de desarrollo; no es obligatorio instalarlo globalmente.

## 3. Instalación y configuración

Clona el repositorio:

```bash
git clone https://github.com/bootcamp-uchile-2026/grupo-4-backend.git
cd grupo-4-backend
```

Crea el archivo de entorno:

```bash
cp .env.example .env
```

Edita `.env` antes de iniciar la aplicación. Las variables disponibles en la plantilla son:

| Variable | Descripción |
| --- | --- |
| `PORT` | Puerto de la aplicación en ejecución local. |
| `API_HOST_PORT` | Puerto del host para acceder a la API con Docker. |
| `DB_HOST` | Host de MySQL para ejecución local. |
| `DB_PORT` | Puerto de MySQL para ejecución local. |
| `DB_HOST_PORT` | Puerto de MySQL publicado en el host por Docker Compose. |
| `DB_NAME` | Nombre de la base de datos. |
| `DB_USER` | Usuario de MySQL. |
| `DB_PASSWORD` | Contraseña del usuario de MySQL. |
| `DB_ROOT_PASSWORD` | Contraseña de `root` en el contenedor MySQL. |
| `JWT_SECRET` | Clave secreta utilizada para firmar y verificar tokens JWT. |
| `ADMIN_EMAILS` | Lista de correos para el seed de administradores. |
| `ADMIN_PASSWORD` | Contraseña configurada para los administradores del seed. |
| `DOCKER_IMAGE` | Imagen utilizada por la configuración de despliegue. |

**Importante:** el archivo `.env` no debe subirse al repositorio. Mantén credenciales reales y secretos fuera del control de versiones. Los valores de `.env.example` son ejemplos y deben reemplazarse.

En `compose.dev.yaml`, el servicio `api` se conecta a MySQL mediante el nombre de servicio `db` y el puerto interno `3306`, independientemente de `DB_HOST` y `DB_PORT` del entorno local.

## 4. Ejecución en desarrollo

### 4.1. Con Docker Compose (recomendado)

Desde la raíz del proyecto:

```bash
docker compose -f compose.dev.yaml up -d --build
```

Esta configuración inicia MySQL 8 y la API. El servicio de la API espera a que MySQL esté saludable y luego ejecuta **automáticamente las migraciones** antes de iniciar NestJS en modo desarrollo.

Consulta el estado de los servicios:

```bash
docker compose -f compose.dev.yaml ps
```

Consulta los logs de la API:

```bash
docker compose -f compose.dev.yaml logs -f api
```

Detén los contenedores sin eliminar los datos:

```bash
docker compose -f compose.dev.yaml down
```

**Reiniciar desde cero (destructivo):**

```bash
docker compose -f compose.dev.yaml down -v
docker compose -f compose.dev.yaml up -d --build
```

`down -v` elimina el volumen de MySQL y **borra los datos de desarrollo**. No lo utilices si necesitas conservarlos.

La API queda disponible por defecto en `http://localhost:3000` y MySQL se publica únicamente en `127.0.0.1` mediante el puerto indicado en `DB_HOST_PORT`.

### 4.2. Ejecución local sin contenedor de API

Instala las dependencias:

```bash
npm install
```

Asegúrate de que MySQL esté disponible, de que las variables de `.env` sean correctas y de que el esquema esté migrado. Después ejecuta:

```bash
npm run migration:run
npm run start:dev
```

Para comprobar la compilación:

```bash
npm run build
```

## 5. Base de datos, migraciones y seeds

El proyecto utiliza **TypeORM** con configuración en `db/typeorm.config.ts`.

### 5.1. Migraciones

Las migraciones están en `db/migrations/` y permiten construir el esquema sin depender de sincronización automática de entidades.

En desarrollo con Docker, se ejecutan automáticamente al iniciar el servicio `api`.

Para ejecutarlas manualmente desde un entorno local configurado:

```bash
npm run migration:run
```

Para revertir la última migración:

```bash
npm run migration:revert
```

La generación de nuevas migraciones utiliza el script `migration:generate` y requiere indicar una ruta de salida según la modificación realizada.

### 5.2. Datos de desarrollo

El archivo `db/seeds/datos-desarrollo.sql` contiene datos de prueba para una **base de desarrollo vacía**, incluidos usuarios de prueba, categorías, proveedores y productos.

Después de iniciar los contenedores y confirmar que terminaron las migraciones, puede cargarse desde la raíz del proyecto:

```bash
docker compose -f compose.dev.yaml exec -T db sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE"' < db/seeds/datos-desarrollo.sql
```

**No ejecutes este seed repetidamente** sobre una base que ya contiene esos registros: está pensado para una carga inicial y puede provocar duplicados o conflictos de claves únicas.

Los usuarios incluidos en el seed son **exclusivos para pruebas**. Antes de depender de sus credenciales, verifica el inicio de sesión mediante la API; los hashes de contraseñas deben corresponder al algoritmo Argon2 utilizado por la aplicación.

### 5.3. Administradores

El proyecto incluye `db/seeds/seed-admins.ts`, destinado a crear administradores a partir de `ADMIN_EMAILS` y `ADMIN_PASSWORD`.

Para ejecutarlo desde un entorno local con acceso a la base de datos y las variables de entorno configuradas:

```bash
npx ts-node db/seeds/seed-admins.ts
```

Este seed es independiente del SQL de desarrollo. No publiques contraseñas de administradores en el repositorio.

## 6. Autenticación y autorización

La API utiliza autenticación con **JWT** y autorización por roles.

- **ADMIN:** puede gestionar productos de cualquier proveedor.
- **PROVEEDOR:** puede crear productos asociados a su propio proveedor y modificar o eliminar únicamente los suyos.
- **CLIENTE:** no tiene permisos para crear, modificar o eliminar productos.
- **Consultas públicas:** los endpoints GET de productos pueden utilizarse sin autenticación.

La protección de rutas utiliza `AuthGuard`, `RolesGuard` y el decorador `@Roles`. La comprobación de propiedad de los productos se realiza en la capa de servicio.

En la creación de productos, un usuario **PROVEEDOR** no necesita indicar `proveedorId`: el sistema lo determina a partir de la asociación del usuario autenticado. Para **ADMIN**, `proveedorId` debe indicarse en la solicitud.

## 7. Documentación de la API

Con la aplicación iniciada, Swagger UI está disponible por defecto en:

**http://localhost:3000/api**

Si cambias `API_HOST_PORT`, ajusta el puerto de la URL.

Para probar endpoints protegidos:

1. Inicia sesión mediante el endpoint de autenticación para obtener un JWT.
2. Selecciona **Authorize** en Swagger e introduce el token correspondiente.
3. Ejecuta la solicitud con el rol que deseas verificar.

Swagger permite revisar rutas, parámetros, DTO, respuestas y códigos HTTP.

## 8. Ejecución en producción

El repositorio contempla `compose.prod.yaml` para ejecutar una imagen publicada en Docker Hub.

### 8.1. Construir y publicar la imagen

Inicia sesión en Docker Hub:

```bash
docker login
```

Construye y publica una imagen (sustituye el nombre por el correspondiente):

```bash
docker build -t usuario-dockerhub/nombre-imagen:latest .
docker push usuario-dockerhub/nombre-imagen:latest
```

Configura en `.env`:

```dotenv
DOCKER_IMAGE=usuario-dockerhub/nombre-imagen:latest
```

### 8.2. Iniciar los servicios

En el servidor, con `compose.prod.yaml` y `.env` configurados:

```bash
docker compose -f compose.prod.yaml pull
docker compose -f compose.prod.yaml up -d
docker compose -f compose.prod.yaml ps
```

Para consultar logs:

```bash
docker compose -f compose.prod.yaml logs -f
```

Para detenerlos:

```bash
docker compose -f compose.prod.yaml down
```

**Importante:** no cargues los seeds de desarrollo en producción. Verifica el proceso de migraciones, las variables y los secretos del despliegue antes de publicar una versión.

## 9. Estructura del proyecto

```text
.
├── src/
│   ├── autenticacion/
│   ├── usuarios/
│   ├── registro/
│   ├── productos/
│   ├── categorias/
│   ├── proveedores/
│   ├── stock/
│   ├── favoritos/
│   ├── carrito/
│   ├── items-carrito/
│   ├── pedidos/
│   ├── checkout/
│   ├── direcciones/
│   ├── resenas/
│   ├── suscripciones/
│   ├── common/
│   └── ...
├── db/
│   ├── migrations/
│   ├── seeds/
│   │   ├── datos-desarrollo.sql
│   │   └── seed-admins.ts
│   └── typeorm.config.ts
├── docs/
├── compose.dev.yaml
├── compose.prod.yaml
├── nest-cli.json
└── package.json
```

El CLI de NestJS está configurado con `"generateOptions": { "spec": false }` para evitar la generación automática de archivos `*.spec.ts`. Esto no impide agregar pruebas manualmente cuando se requieran.

## 10. Flujo de trabajo

El equipo utiliza **Git y GitHub** con ramas y Pull Requests.

- `main`: rama principal del proyecto.
- `develop`: rama de integración.
- Ramas de trabajo: `feat/`, `fix/`, `docs/` y `chore/`, según la tarea.

Flujo habitual:

1. Actualizar `develop` desde el remoto.
2. Crear una rama específica para la tarea.
3. Implementar y verificar los cambios.
4. Registrar commits descriptivos en español.
5. Publicar la rama y abrir un Pull Request hacia `develop`.
6. Revisar y resolver observaciones antes de integrar.

No se deben incorporar cambios directamente a ramas protegidas fuera del proceso de revisión del equipo.

## 11. Estado del proyecto

LaSobremesa continúa en desarrollo. Ya se dispone de una estructura modular, persistencia con MySQL/TypeORM, migraciones, autenticación JWT y autorización por roles y propiedad para la gestión de productos.

Los módulos del proyecto evolucionan de forma incremental; la presencia de un módulo en el repositorio no implica que todas sus funcionalidades estén terminadas o validadas.

## 12. Contacto

Proyecto desarrollado por el equipo de LaSobremesa en el marco del bootcamp de backend de la Universidad de Chile.

**Repositorio:** [bootcamp-uchile-2026/grupo-4-backend](https://github.com/bootcamp-uchile-2026/grupo-4-backend)

- **Camilo Díaz:** camilo.cdh.dev@gmail.com — [camilo-cdh](https://github.com/camilo-cdh)
- **Joaquín Pérez:** jperezoyarce@gmail.com — [jota-pe-ge](https://github.com/jota-pe-ge)
- **Ignacio Chávez:** ignacio.chr99@gmail.com — [Ignaciochr99](https://github.com/Ignaciochr99)
