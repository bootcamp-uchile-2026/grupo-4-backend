import 'reflect-metadata';
import 'dotenv/config';
import * as argon2 from 'argon2';

import dataSource from '../typeorm.config';
import { Usuario } from '../../src/usuarios/entities/usuario.entity';
import { RolUsuario } from '../../src/usuarios/enums/rol-usuario.enum';

async function seedAdmins() {
  const adminEmails = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);

  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmails.length || !adminPassword) {
    throw new Error('Faltan ADMIN_EMAILS o ADMIN_PASSWORD en el .env');
  }

  await dataSource.initialize();

  try {
    const repo = dataSource.getRepository(Usuario);

    const passwordHash = await argon2.hash(adminPassword, {
      type: argon2.argon2id,
    });

    for (const email of adminEmails) {
      const existe = await repo.findOneBy({ email });

      if (existe) {
        console.log(`El usuario ya existe: ${email}`);
        continue;
      }

      const admin = repo.create({
        nombre: 'Administrador',
        apellido: 'LaSobremesa',
        email,
        password_hash: passwordHash,
        rol: RolUsuario.ADMIN,
      });

      await repo.save(admin);

      console.log(`Administrador creado: ${email}`);
    }

    console.log('Seed de administradores finalizado.');
  } finally {
    await dataSource.destroy();
  }
}

seedAdmins().catch((error: unknown) => {
  console.error('Error al ejecutar el seed:', error);
  process.exitCode = 1;
});
