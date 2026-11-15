
import { MigrationInterface, QueryRunner } from 'typeorm';

export class NormalizeUserRoles1794700000000
  implements MigrationInterface
{
  name = 'NormalizeUserRoles1794700000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Crear catálogo de roles
    await queryRunner.query(`
      CREATE TABLE roles (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(30) NOT NULL UNIQUE
      ) ENGINE=InnoDB
    `);

    // 2. Insertar roles fijos
    await queryRunner.query(`
      INSERT INTO roles (nombre)
      VALUES ('CLIENTE'), ('ADMIN'), ('PROVEEDOR')
    `);

    // 3. Agregar columna temporalmente nullable
    await queryRunner.query(`
      ALTER TABLE usuarios
      ADD COLUMN rol_id INT UNSIGNED NULL
    `);

    // 4. Migrar los roles de los usuarios existentes
    await queryRunner.query(`
      UPDATE usuarios u
      INNER JOIN roles r ON r.nombre = u.rol
      SET u.rol_id = r.id
    `);

    // 5. Comprobar que todos los usuarios tienen un rol
    const pendientes: Array<{ total: string | number }> =
      await queryRunner.query(`
        SELECT COUNT(*) AS total
        FROM usuarios
        WHERE rol_id IS NULL
      `);

    if (Number(pendientes[0].total) > 0) {
      throw new Error(
        'No se pudieron migrar los roles de todos los usuarios.',
      );
    }

    // 6. Hacer obligatoria la relación
    await queryRunner.query(`
      ALTER TABLE usuarios
      MODIFY COLUMN rol_id INT UNSIGNED NOT NULL
    `);

    // 7. Crear clave foránea
    await queryRunner.query(`
      ALTER TABLE usuarios
      ADD CONSTRAINT FK_usuarios_roles
      FOREIGN KEY (rol_id) REFERENCES roles(id)
    `);

    // 8. Eliminar el enum antiguo
    await queryRunner.query(`
      ALTER TABLE usuarios
      DROP COLUMN rol
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 1. Recuperar la columna enum
    await queryRunner.query(`
      ALTER TABLE usuarios
      ADD COLUMN rol ENUM('CLIENTE','ADMIN','PROVEEDOR')
      NULL
    `);

    // 2. Recuperar los roles originales
    await queryRunner.query(`
      UPDATE usuarios u
      INNER JOIN roles r ON r.id = u.rol_id
      SET u.rol = r.nombre
    `);

    // 3. Comprobar que todos los roles se recuperaron
    const pendientes: Array<{ total: string | number }> =
      await queryRunner.query(`
        SELECT COUNT(*) AS total
        FROM usuarios
        WHERE rol IS NULL
      `);

    if (Number(pendientes[0].total) > 0) {
      throw new Error(
        'No se pudieron restaurar los roles de todos los usuarios.',
      );
    }

    // 4. Restaurar restricciones originales
    await queryRunner.query(`
      ALTER TABLE usuarios
      MODIFY COLUMN rol
      ENUM('CLIENTE','ADMIN','PROVEEDOR')
      NOT NULL DEFAULT 'CLIENTE'
    `);

    // 5. Eliminar la relación
    await queryRunner.query(`
      ALTER TABLE usuarios
      DROP FOREIGN KEY FK_usuarios_roles
    `);

    await queryRunner.query(`
      ALTER TABLE usuarios
      DROP COLUMN rol_id
    `);

    // 6. Eliminar catálogo
    await queryRunner.query(`
      DROP TABLE roles
    `);
  }
}
