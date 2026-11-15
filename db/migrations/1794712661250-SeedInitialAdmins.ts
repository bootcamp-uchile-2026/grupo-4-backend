import { MigrationInterface, QueryRunner } from 'typeorm';
import * as argon2 from 'argon2';

export class SeedInitialAdmins1794711000000
  implements MigrationInterface
{
  name = 'SeedInitialAdmins1794711000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminEmails = [
      ...new Set(
        (process.env.ADMIN_EMAILS ?? '')
          .split(',')
          .map((email) => email.trim())
          .filter(Boolean),
      ),
    ];

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmails.length || !adminPassword) {
      throw new Error('Faltan ADMIN_EMAILS o ADMIN_PASSWORD');
    }

    const roles: { id: number }[] = await queryRunner.query(
      "SELECT id FROM roles WHERE nombre = 'ADMIN' LIMIT 1",
    );

    if (!roles.length) {
      throw new Error('El rol ADMIN no existe');
    }

    const passwordHash = await argon2.hash(adminPassword, {
      type: argon2.argon2id,
    });

    for (const email of adminEmails) {
      const existentes: { id: number }[] = await queryRunner.query(
        'SELECT id FROM usuarios WHERE email = ? LIMIT 1',
        [email],
      );

      if (existentes.length) {
        continue;
      }

      await queryRunner.query(
        `INSERT INTO usuarios
          (nombre, apellido, email, password_hash, rol_id)
         VALUES (?, ?, ?, ?, ?)`,
        ['Administrador', 'LaSobremesa', email, passwordHash, roles[0].id],
      );
    }
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    // No eliminar cuentas administrativas automáticamente.
  }
}
