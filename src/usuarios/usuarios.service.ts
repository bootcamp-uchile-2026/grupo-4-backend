import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import * as argon2 from 'argon2';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioAdminDto } from './dto/create-usuario-admin.dto';
@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private readonly repo: Repository<Usuario>,
  ) {}

  private publicUser(u: Usuario) {
    return {
      id: u.id,
      nombre: u.nombre,
      apellido: u.apellido,
      email: u.email,
      telefono: u.telefono ?? null,
      rol: u.rol,
    };
  }
  async create(dto: CreateUsuarioDto) {
    if (await this.repo.existsBy({ email: dto.email }))
      throw new ConflictException('Ya existe un usuario con ese email.');
    const u = await this.repo.save(
      this.repo.create({
        nombre: dto.nombre,
        apellido: dto.apellido,
        email: dto.email,
        telefono: dto.telefono,
        password_hash: await argon2.hash(dto.password, {
          type: argon2.argon2id,
        }),
      }),
    );
    return this.publicUser(u);
  }

  async createAdmin(dto: CreateUsuarioAdminDto) {
    if (await this.repo.existsBy({ email: dto.email })) {
      throw new ConflictException('Ya existe un usuario con ese email.');
    }

    const usuario = this.repo.create({
      nombre: dto.nombre,
      apellido: dto.apellido,
      email: dto.email,
      telefono: dto.telefono,
      password_hash: await argon2.hash(dto.password, {
        type: argon2.argon2id,
      }),
      rol: dto.rol,
    });

    return this.publicUser(await this.repo.save(usuario));
  }

  async findAll() {
    return (await this.repo.find()).map((u) => this.publicUser(u));
  }
  async findOne(id: number) {
    return this.publicUser(await this.buscar(id));
  }
  async update(id: number, dto: UpdateUsuarioDto) {
    const u = await this.buscar(id);
    if (
      dto.email &&
      (await this.repo.existsBy({ email: dto.email, id: Not(id) }))
    )
      throw new ConflictException('Ya existe un usuario con ese email.');
    if (dto.nombre !== undefined) u.nombre = dto.nombre;
    if (dto.apellido !== undefined) u.apellido = dto.apellido;
    if (dto.email !== undefined) u.email = dto.email;
    if (dto.telefono !== undefined) u.telefono = dto.telefono;
    if (dto.password !== undefined) {
      u.password_hash = await argon2.hash(dto.password, {
        type: argon2.argon2id,
      });
    }
    return this.publicUser(await this.repo.save(u));
  }
  async remove(id: number) {
    await this.repo.remove(await this.buscar(id));
  }
  private async buscar(id: number) {
    const u = await this.repo.findOneBy({ id });
    if (!u) throw new NotFoundException('Usuario no encontrado.');
    return u;
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.repo.findOneBy({ email });
  }

}
