import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCategorias1794883075488 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO categorias (nombre) VALUES
        ('Lácteos'),
        ('Mermeladas'),
        ('Aceites')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM categorias
      WHERE nombre IN ('Lácteos', 'Mermeladas', 'Aceites')
    `);
  }
}
