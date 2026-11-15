
# LaSobremesa — Backend

<p align="center">
  <img src="./docs/logo.svg" alt="LaSobremesa" width="250">
</p>

API REST desarrollada con **NestJS y TypeScript** para el ecommerce **LaSobremesa**, orientado a la comercialización de productos artesanales de proveedores locales.

El proyecto se organiza en módulos de negocio y utiliza **MySQL 8 y TypeORM** para la persistencia, **JWT** para autenticación y controles de acceso por roles y propiedad de recursos.

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
| `ADMIN_EMAILS` | Correos de administradores iniciales, separados por comas. |
| `ADMIN_PASSWORD` | Contraseña inicial de los administradores. |
| `DOCKER_IMAGE` | Nombre y etiqueta de la imagen publicada en Docker Hub. |

**Importante:** el archivo `.env` no debe subirse al repositorio. Mantén credenciales reales y secretos fuera del control de versiones. Los valores de `.env.example` son ejemplos y deben reemplazarse.

En `compose.dev.yaml`, el servicio `api` se conecta a MySQL mediante el nombre de servicio `db` y el puerto interno `3306`, independientemente de `DB_HOST` y `DB_PORT` del entorno local.

Las variables `ADMIN_EMAILS` y `ADMIN_PASSWORD` son necesarias para la migración que crea los administradores iniciales.

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

Asegúrate de que MySQL esté disponible, de que las variables de `.env` sean correctas y de que el esquema esté migrado.

Después ejecuta:

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

El esquema de la base de datos se administra mediante migraciones, siguiendo un enfoque **database-first**.

### 5.1. Migraciones

Las migraciones están en `db/migrations/` y permiten construir y modificar el esquema sin depender de la sincronización automática de entidades.

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

Entre las migraciones implementadas se incluyen:

- Creación y evolución del esquema relacional.
- Normalización de los roles de usuarios.
- Creación de administradores iniciales.

TypeORM registra las migraciones ejecutadas en la tabla `migrations`, evitando volver a ejecutar las que ya fueron aplicadas.

### 5.2. Datos de desarrollo

El archivo `db/seeds/datos-desarrollo.sql` contiene datos de prueba para una **base de desarrollo vacía**, incluidos usuarios de prueba, categorías, proveedores y productos.

Después de iniciar los contenedores y confirmar que terminaron las migraciones, puede cargarse desde la raíz del proyecto:

```bash
docker compose -f compose.dev.yaml exec -T db sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE"' < db/seeds/datos-desarrollo.sql
```

**No ejecutes este seed repetidamente** sobre una base que ya contiene esos registros: está pensado para una carga inicial y puede provocar duplicados o conflictos de claves únicas.

Los usuarios incluidos en el seed son **exclusivos para pruebas**. Antes de depender de sus credenciales, verifica el inicio de sesión mediante la API; los hashes de contraseñas deben corresponder al algoritmo Argon2 utilizado por la aplicación.

**No cargues datos de desarrollo en producción.**

### 5.3. Administradores iniciales

Los administradores iniciales se crean mediante la migración de TypeORM `SeedInitialAdmins`.

Esta migración utiliza las siguientes variables de entorno:

```dotenv
ADMIN_EMAILS=admin1@example.com,admin2@example.com
ADMIN_PASSWORD=cambia_esta_clave
```

- `ADMIN_EMAILS`: lista de correos electrónicos separados por comas.
- `ADMIN_PASSWORD`: contraseña inicial utilizada para los administradores.

La migración realiza las siguientes operaciones:

1. Obtiene el identificador del rol `ADMIN` desde la tabla `roles`.
2. Comprueba si cada correo electrónico ya existe en la tabla `usuarios`.
3. Crea los administradores que todavía no existen.
4. Almacena las contraseñas utilizando hash Argon2id.

La migración se ejecuta automáticamente al iniciar el servicio `api` mediante Docker Compose, tanto en desarrollo como en producción.

No es necesario ejecutar un script de seed independiente.

**Importante:** utiliza contraseñas seguras y no publiques credenciales en el repositorio. La contraseña configurada es una credencial inicial y debe administrarse de acuerdo con las políticas de seguridad del proyecto.

## 6. Autenticación y autorización

La API utiliza autenticación con **JWT** y autorización por roles.

Los roles definidos son:

- **ADMIN:** puede gestionar productos de cualquier proveedor.
- **PROVEEDOR:** puede crear productos asociados a su propio proveedor y modificar o eliminar únicamente los suyos.
- **CLIENTE:** no tiene permisos para crear, modificar o eliminar productos.
- **Consultas públicas:** los endpoints GET de productos pueden utilizarse sin autenticación.

La protección de rutas utiliza `AuthGuard`, `RolesGuard` y el decorador `@Roles`.

La comprobación de propiedad de los productos se realiza en la capa de servicio.

En la creación de productos, un usuario **PROVEEDOR** no necesita indicar `proveedorId`: el sistema lo determina a partir de la asociación del usuario autenticado.

Para **ADMIN**, `proveedorId` debe indicarse en la solicitud.

### 6.1. Normalización de roles

Los roles se almacenan en una tabla independiente llamada `roles`.

La tabla `usuarios` contiene la columna `rol_id`, que establece una relación mediante clave foránea con `roles.id`.

Los roles iniciales son:

| ID | Rol |
| --- | --- |
| 1 | CLIENTE |
| 2 | ADMIN |
| 3 | PROVEEDOR |

La migración `NormalizeUserRoles` transforma el esquema anterior, reemplazando la columna de texto `usuarios.rol` por la relación `usuarios.rol_id`.

Esta estructura permite mantener la integridad referencial y centralizar la definición de roles.

### 6.2. Endpoints de roles

La API dispone de los siguientes endpoints:

| Método | Endpoint | Descripción |
| --- | --- | --- |
| GET | `/roles` | Consultar los roles disponibles. |
| GET | `/roles/:id` | Consultar un rol por su identificador. |
| PATCH | `/usuarios/:id/rol` | Modificar el rol de un usuario. |

La modificación del rol de un usuario está restringida a usuarios autenticados con rol **ADMIN**.

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

La aplicación y MySQL se ejecutan en contenedores independientes, utilizando un volumen persistente para almacenar los datos de la base de datos.

### 8.1. Construir y publicar la imagen

Inicia sesión en Docker Hub:

```bash
docker login
```

Construye la imagen desde la raíz del proyecto, utilizando una etiqueta de versión:

```bash
docker build -t camilocdh/lasobremesa:1.0.3 .
```

Publica la imagen:

```bash
docker push camilocdh/lasobremesa:1.0.3
```

La versión `1.0.3` es un ejemplo de una imagen publicada. Para nuevas versiones, utiliza una etiqueta diferente.

Configura en `.env` la imagen que deseas desplegar:

```dotenv
DOCKER_IMAGE=camilocdh/lasobremesa:1.0.3
```

Si el repositorio de Docker Hub es privado, el servidor de producción deberá contar con la autenticación correspondiente.

### 8.2. Iniciar los servicios

En el servidor de producción, con Docker y Docker Compose instalados, configura los archivos:

- `compose.prod.yaml`
- `.env`

Asegúrate de definir correctamente las variables de MySQL, JWT, administradores e imagen Docker.

Descarga las imágenes:

```bash
docker compose -f compose.prod.yaml pull
```

Inicia los servicios:

```bash
docker compose -f compose.prod.yaml up -d
```

Comprueba el estado de los contenedores:

```bash
docker compose -f compose.prod.yaml ps
```

Consulta los logs de la API:

```bash
docker compose -f compose.prod.yaml logs -f api
```

Para detener los servicios sin eliminar los volúmenes:

```bash
docker compose -f compose.prod.yaml down
```

La configuración de producción no publica el puerto de MySQL en el host. La API y la base de datos se comunican mediante la red interna creada por Docker Compose.

### 8.3. Migraciones en producción

El servicio `api` ejecuta automáticamente las migraciones pendientes antes de iniciar NestJS.

El comando configurado en `compose.prod.yaml` es:

```bash
npm run migration:run:prod
```

Este comando utiliza la configuración compilada de TypeORM:

```text
dist/db/typeorm.config.js
```

Una vez finalizadas correctamente las migraciones, se ejecuta:

```bash
npm run start:prod
```

De esta forma, el inicio de la aplicación depende de que las migraciones terminen correctamente.

Entre las migraciones utilizadas en producción se incluyen:

- Normalización de roles de usuarios.
- Creación de administradores iniciales.

Las migraciones ya aplicadas quedan registradas en la tabla `migrations` y no se vuelven a ejecutar durante los siguientes despliegues.

El servicio MySQL utiliza el volumen persistente `mysql_prod_data`, por lo que actualizar o recrear el contenedor de la API no elimina los datos almacenados.

**Importante:** no utilices `docker compose down -v` en producción, ya que esta opción elimina los volúmenes administrados por Docker Compose.

Antes de ejecutar migraciones que modifiquen estructuras o datos existentes, se recomienda contar con un respaldo de la base de datos.

### 8.4. Verificación del despliegue

Después de actualizar la aplicación, comprueba el estado de los contenedores:

```bash
docker compose -f compose.prod.yaml ps
```

Consulta los logs:

```bash
docker compose -f compose.prod.yaml logs --tail=50 api
```

Una aplicación iniciada correctamente debe mostrar un mensaje similar a:

```text
[NestApplication] Nest application successfully started
```

También se recomienda realizar una solicitud HTTP a un endpoint disponible para verificar que la API responde correctamente.

**Importante:** no cargues los seeds de desarrollo en producción. Verifica las migraciones, las variables de entorno y los secretos antes de publicar una nueva versión.

## 9. Estructura del proyecto

La estructura principal del proyecto es la siguiente:

```text
.
├── src/
│   ├── autenticacion/
│   ├── usuarios/
│   ├── roles/
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
│   │   └── datos-desarrollo.sql
│   └── typeorm.config.ts
├── docs/
│   ├── mer.md
│   ├── script.sql
│   └── ...
├── compose.dev.yaml
├── compose.prod.yaml
├── Dockerfile
├── .env.example
├── nest-cli.json
└── package.json
```

El directorio `db/migrations/` contiene las migraciones de TypeORM utilizadas para crear y actualizar el esquema.

El directorio `db/seeds/` contiene los datos de prueba para desarrollo.

El directorio `docs/` contiene documentación complementaria del proyecto, incluido el modelo entidad-relación.

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

LaSobremesa continúa en desarrollo.

Actualmente cuenta con una estructura modular, persistencia mediante MySQL 8 y TypeORM, migraciones, autenticación JWT y autorización por roles y propiedad para la gestión de productos.

El esquema de roles se encuentra normalizado mediante una tabla independiente y los administradores iniciales se crean a través de una migración.

El proyecto también dispone de configuraciones Docker Compose diferenciadas para desarrollo y producción, con ejecución automática de migraciones antes del inicio de la API.

Los módulos del proyecto evolucionan de forma incremental; la presencia de un módulo en el repositorio no implica que todas sus funcionalidades estén terminadas o validadas.

## 12. Contacto

Proyecto desarrollado por el equipo de LaSobremesa en el marco del bootcamp de backend de la Universidad de Chile.

**Repositorio:** [bootcamp-uchile-2026/grupo-4-backend](https://github.com/bootcamp-uchile-2026/grupo-4-backend)

- **Camilo Díaz:** camilo.cdh.dev@gmail.com — [camilo-cdh](https://github.com/camilo-cdh)
- **Joaquín Pérez:** jperezoyarce@gmail.com — [jota-pe-ge](https://github.com/jota-pe-ge)
