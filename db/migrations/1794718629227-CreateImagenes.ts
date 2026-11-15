import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateImagenes1794718629227 implements MigrationInterface {
  name = 'CreateImagenes1794718629227';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE imagenes (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        producto_id INT UNSIGNED NULL,
        proveedor_id INT UNSIGNED NULL,
        nombre VARCHAR(255) NOT NULL,
        ruta VARCHAR(500) NOT NULL,
        mime_type VARCHAR(100) NULL,
        tamano BIGINT UNSIGNED NULL,
        es_principal BOOLEAN NOT NULL DEFAULT FALSE,
        creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT FK_imagenes_productos
          FOREIGN KEY (producto_id)
          REFERENCES productos(id)
          ON DELETE CASCADE,

        CONSTRAINT FK_imagenes_proveedores
          FOREIGN KEY (proveedor_id)
          REFERENCES proveedores(id)
          ON DELETE CASCADE,

        CONSTRAINT CHK_imagenes_propietario
          CHECK (
            (producto_id IS NOT NULL AND proveedor_id IS NULL)
            OR
            (producto_id IS NULL AND proveedor_id IS NOT NULL)
          )
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      ALTER TABLE productos
      DROP COLUMN imagen
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE productos
      ADD COLUMN imagen VARCHAR(500) NULL
    `);

    await queryRunner.query(`
      DROP TABLE imagenes
    `);
  }
}
