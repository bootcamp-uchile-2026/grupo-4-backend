import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialSchema1794370000000 implements MigrationInterface {
  name = 'CreateInitialSchema1794370000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE usuarios (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(100) NOT NULL,
          apellido VARCHAR(100) NOT NULL,
          email VARCHAR(190) NOT NULL UNIQUE,
          telefono VARCHAR(30),
          password_hash VARCHAR(255) NOT NULL,
          rol ENUM('CLIENTE','ADMIN','PROVEEDOR') NOT NULL DEFAULT 'CLIENTE',
          email_verificado BOOLEAN NOT NULL DEFAULT FALSE,
          creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await queryRunner.query(`
      CREATE TABLE categorias (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(120) NOT NULL UNIQUE
      )
    `);
    await queryRunner.query(`
      CREATE TABLE proveedores (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(150) NOT NULL,
          descripcion TEXT,
          email VARCHAR(190) UNIQUE,
          telefono VARCHAR(30),
          usuario_id INT UNSIGNED NULL UNIQUE,
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE productos (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          categoria_id INT UNSIGNED NOT NULL,
          proveedor_id INT UNSIGNED NOT NULL,
          nombre VARCHAR(180) NOT NULL,
          descripcion TEXT,
          ingredientes TEXT,
          valor_nutricional TEXT,
          tipo_conservacion VARCHAR(50),
          fecha_vencimiento DATE NULL,
          precio DECIMAL(12,2) NOT NULL,
          descuento DECIMAL(5,2) NOT NULL DEFAULT 0,
          imagen VARCHAR(500),
          stock_cantidad INT UNSIGNED NOT NULL DEFAULT 0,
          stock_minimo INT UNSIGNED NOT NULL DEFAULT 0,
          favorito BOOLEAN NOT NULL DEFAULT FALSE,
          activo BOOLEAN NOT NULL DEFAULT TRUE,
          FOREIGN KEY (categoria_id) REFERENCES categorias(id),
          FOREIGN KEY (proveedor_id) REFERENCES proveedores(id),
          CHECK (precio >= 0),
          CHECK (descuento BETWEEN 0 AND 100)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE direcciones (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          usuario_id INT UNSIGNED NOT NULL,
          nombre_receptor VARCHAR(150),
          telefono VARCHAR(30),
          calle VARCHAR(180) NOT NULL,
          numero VARCHAR(30) NOT NULL,
          comuna VARCHAR(120) NOT NULL,
          ciudad VARCHAR(120) NOT NULL,
          region VARCHAR(120) NOT NULL,
          instrucciones TEXT,
          es_predeterminada BOOLEAN NOT NULL DEFAULT FALSE,
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE carritos (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          usuario_id INT UNSIGNED NOT NULL UNIQUE,
          creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE carrito_items (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          carrito_id INT UNSIGNED NOT NULL,
          producto_id INT UNSIGNED NOT NULL,
          cantidad INT UNSIGNED NOT NULL,
          UNIQUE (carrito_id, producto_id),
          FOREIGN KEY (carrito_id) REFERENCES carritos(id) ON DELETE CASCADE,
          FOREIGN KEY (producto_id) REFERENCES productos(id),
          CHECK (cantidad > 0)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE metodos_entrega (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(120) NOT NULL UNIQUE,
          precio DECIMAL(12,2) NOT NULL DEFAULT 0
      )
    `);
    await queryRunner.query(`
      CREATE TABLE pedidos (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          usuario_id INT UNSIGNED NOT NULL,
          direccion_id INT UNSIGNED NOT NULL,
          metodo_entrega_id INT UNSIGNED NULL,
          estado ENUM('PENDING','PREPARING','SHIPPED','DELIVERED','CANCELLED') NOT NULL DEFAULT 'PENDING',
          total DECIMAL(12,2) NOT NULL DEFAULT 0,
          creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
          FOREIGN KEY (direccion_id) REFERENCES direcciones(id),
          FOREIGN KEY (metodo_entrega_id) REFERENCES metodos_entrega(id)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE pedido_items (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          pedido_id INT UNSIGNED NOT NULL,
          producto_id INT UNSIGNED NOT NULL,
          nombre_producto VARCHAR(180) NOT NULL,
          precio_unitario DECIMAL(12,2) NOT NULL,
          cantidad INT UNSIGNED NOT NULL,
          subtotal DECIMAL(12,2) NOT NULL,
          FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
          FOREIGN KEY (producto_id) REFERENCES productos(id),
          CHECK (cantidad > 0)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE historial_estados_pedido (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          pedido_id INT UNSIGNED NOT NULL,
          estado VARCHAR(30) NOT NULL,
          fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE zonas_despacho (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(120) NOT NULL UNIQUE
      )
    `);
    await queryRunner.query(`
      CREATE TABLE despachos (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          pedido_id INT UNSIGNED NOT NULL UNIQUE,
          zona_id INT UNSIGNED NULL,
          estado VARCHAR(40) NOT NULL,
          codigo_seguimiento VARCHAR(120) NULL,
          FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
          FOREIGN KEY (zona_id) REFERENCES zonas_despacho(id)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE seguimientos_despacho (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          despacho_id INT UNSIGNED NOT NULL,
          estado VARCHAR(40) NOT NULL,
          detalle TEXT,
          fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (despacho_id) REFERENCES despachos(id)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE resenas (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          usuario_id INT UNSIGNED NOT NULL,
          producto_id INT UNSIGNED NOT NULL,
          titulo VARCHAR(180) NOT NULL,
          estrellas TINYINT UNSIGNED NOT NULL,
          detalle TEXT,
          UNIQUE (usuario_id,producto_id),
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
          FOREIGN KEY (producto_id) REFERENCES productos(id),
          CHECK (estrellas BETWEEN 1 AND 5)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE favoritos (
          usuario_id INT UNSIGNED NOT NULL,
          producto_id INT UNSIGNED NOT NULL,
          PRIMARY KEY (usuario_id,producto_id),
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
          FOREIGN KEY (producto_id) REFERENCES productos(id)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE suscripciones (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(150) NOT NULL,
          descripcion TEXT,
          precio DECIMAL(12,2) NOT NULL,
          activa BOOLEAN NOT NULL DEFAULT TRUE
      )
    `);
    await queryRunner.query(`
      CREATE TABLE suscripcion_productos (
          suscripcion_id INT UNSIGNED NOT NULL,
          producto_id INT UNSIGNED NOT NULL,
          cantidad INT UNSIGNED NOT NULL DEFAULT 1,
          PRIMARY KEY (suscripcion_id,producto_id),
          FOREIGN KEY (suscripcion_id) REFERENCES suscripciones(id) ON DELETE CASCADE,
          FOREIGN KEY (producto_id) REFERENCES productos(id)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE suscripciones_usuarios (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          usuario_id INT UNSIGNED NOT NULL,
          suscripcion_id INT UNSIGNED NOT NULL,
          fecha_inicio TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          estado VARCHAR(30) NOT NULL DEFAULT 'ACTIVA',
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
          FOREIGN KEY (suscripcion_id) REFERENCES suscripciones(id)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE metodos_pago (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          usuario_id INT UNSIGNED NOT NULL,
          proveedor_pago VARCHAR(80) NOT NULL,
          token_referencia VARCHAR(255) NOT NULL,
          marca VARCHAR(40),
          ultimos_cuatro CHAR(4),
          vencimiento_mes TINYINT UNSIGNED,
          vencimiento_anio SMALLINT UNSIGNED,
          es_predeterminado BOOLEAN NOT NULL DEFAULT FALSE,
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE pagos (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          pedido_id INT UNSIGNED NOT NULL,
          metodo_pago_id INT UNSIGNED NULL,
          monto DECIMAL(12,2) NOT NULL,
          estado VARCHAR(40) NOT NULL,
          referencia_externa VARCHAR(190),
          creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
          FOREIGN KEY (metodo_pago_id) REFERENCES metodos_pago(id)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE datos_facturacion (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          pedido_id INT UNSIGNED NOT NULL UNIQUE,
          razon_social VARCHAR(180),
          rut VARCHAR(20),
          giro VARCHAR(180),
          direccion TEXT,
          FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE tokens_recuperacion (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          usuario_id INT UNSIGNED NOT NULL,
          token_hash VARCHAR(255) NOT NULL,
          expira_en DATETIME NOT NULL,
          usado_en DATETIME NULL,
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS `tokens_recuperacion`');
    await queryRunner.query('DROP TABLE IF EXISTS `datos_facturacion`');
    await queryRunner.query('DROP TABLE IF EXISTS `pagos`');
    await queryRunner.query('DROP TABLE IF EXISTS `metodos_pago`');
    await queryRunner.query('DROP TABLE IF EXISTS `suscripciones_usuarios`');
    await queryRunner.query('DROP TABLE IF EXISTS `suscripcion_productos`');
    await queryRunner.query('DROP TABLE IF EXISTS `suscripciones`');
    await queryRunner.query('DROP TABLE IF EXISTS `favoritos`');
    await queryRunner.query('DROP TABLE IF EXISTS `resenas`');
    await queryRunner.query('DROP TABLE IF EXISTS `seguimientos_despacho`');
    await queryRunner.query('DROP TABLE IF EXISTS `despachos`');
    await queryRunner.query('DROP TABLE IF EXISTS `zonas_despacho`');
    await queryRunner.query('DROP TABLE IF EXISTS `historial_estados_pedido`');
    await queryRunner.query('DROP TABLE IF EXISTS `pedido_items`');
    await queryRunner.query('DROP TABLE IF EXISTS `pedidos`');
    await queryRunner.query('DROP TABLE IF EXISTS `metodos_entrega`');
    await queryRunner.query('DROP TABLE IF EXISTS `carrito_items`');
    await queryRunner.query('DROP TABLE IF EXISTS `carritos`');
    await queryRunner.query('DROP TABLE IF EXISTS `direcciones`');
    await queryRunner.query('DROP TABLE IF EXISTS `productos`');
    await queryRunner.query('DROP TABLE IF EXISTS `proveedores`');
    await queryRunner.query('DROP TABLE IF EXISTS `categorias`');
    await queryRunner.query('DROP TABLE IF EXISTS `usuarios`');
  }
}
