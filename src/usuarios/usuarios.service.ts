import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  private usuarios: Usuario[] = [];

  constructor() {
    this.create({
      nombre: 'Camilo',
      apellido: 'Díaz',
      email: 'camilo@example.com',
      telefono: '+56912345678',
      password: 'MiPassword123!',
    });
    this.create({
      nombre: 'Javiera',
      apellido: 'Rojas',
      email: 'javiera@example.com',
      telefono: '+56987654321',
      password: 'OtraPassword456!',
    });
  }

  create(createUsuarioDto: CreateUsuarioDto) {
    const existe = this.usuarios.find(
      (u) => u.email === createUsuarioDto.email,
    );
    if (existe) {
      throw new ConflictException('Ya existe un usuario con ese email.');
    }

    const usuario = new Usuario(
      randomUUID(),
      createUsuarioDto.nombre,
      createUsuarioDto.apellido,
      createUsuarioDto.email,
      createUsuarioDto.telefono,
      createUsuarioDto.password,
    );
    this.usuarios.push(usuario);
    return this.sinPassword(usuario);
  }

  findAll() {
    return this.usuarios.map((u) => this.sinPassword(u));
  }

  findOne(id: string) {
    const usuario = this.buscar(id);
    return this.sinPassword(usuario);
  }

  update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = this.buscar(id);

    if (updateUsuarioDto.email) {
      const existe = this.usuarios.find(
        (u) => u.email === updateUsuarioDto.email && u.id !== id,
      );
      if (existe) {
        throw new ConflictException('Ya existe un usuario con ese email.');
      }
    }

    for (const campo in updateUsuarioDto) {
      const valor = updateUsuarioDto[campo];
      if (valor !== undefined && valor !== null) {
        usuario[campo] = valor;
      }
    }

    return this.sinPassword(usuario);
  }

  remove(id: string) {
    this.buscar(id);
    this.usuarios = this.usuarios.filter((u) => u.id !== id);
  }

  private buscar(id: string) {
    const usuario = this.usuarios.find((u) => u.id === id);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    return usuario;
  }

  private sinPassword(usuario: Usuario) {
    return {
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      telefono: usuario.telefono,
    };
  }
}
