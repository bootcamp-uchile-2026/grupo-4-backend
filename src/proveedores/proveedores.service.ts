import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as argon2 from 'argon2';

import { Proveedor } from './entities/proveedor.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Rol } from '../roles/entities/rol.entity';
import { Imagen } from '../archivos/entities/imagen.entity';

import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { ProveedorResponseDto } from './dto/proveedor-response.dto';
import { ImagenResponseDto } from '../archivos/dto/imagen-response.dto';
import { RolUsuario } from '../usuarios/enums/rol-usuario.enum';
import { ArchivosService } from '../archivos/archivos.service';
import type { JwtPayload } from '../autenticacion/guards/auth.guard';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly repository: Repository<Proveedor>,

    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,

    @InjectRepository(Rol)
    private readonly rolesRepository: Repository<Rol>,

    @InjectRepository(Imagen)
    private readonly imagenesRepository: Repository<Imagen>,

    private readonly archivosService: ArchivosService,
  ) {}

  private toResponse(proveedor: Proveedor): ProveedorResponseDto {
    return {
      id: proveedor.id,
      nombre: proveedor.nombre,
      descripcion: proveedor.descripcion ?? '',
      email: proveedor.email ?? '',
      telefono: proveedor.telefono ?? '',
      imagenes: (proveedor.imagenes ?? []).map((imagen) => ({
        id: imagen.id,
        ruta: imagen.ruta,
        esPrincipal: imagen.es_principal,
      })),
    };
  }

  private validarPropiedad(proveedor: Proveedor, usuario: JwtPayload): void {
    if (usuario.role === RolUsuario.ADMIN) return;

    if (
      usuario.role !== RolUsuario.PROVEEDOR ||
      proveedor.usuario_id !== usuario.sub
    ) {
      throw new ForbiddenException(
        'No tienes permisos para modificar este proveedor',
      );
    }
  }

  private async toResponses(
    proveedores: Proveedor[],
  ): Promise<ProveedorResponseDto[]> {
    if (proveedores.length === 0) return [];

    const imagenes = await this.imagenesRepository.find({
      where: { proveedor_id: In(proveedores.map((p) => p.id)) },
      order: { es_principal: 'DESC', id: 'ASC' },
    });

    const agrupadas = new Map<number, Imagen[]>();

    for (const imagen of imagenes) {
      if (imagen.proveedor_id === null) continue;

      const grupo = agrupadas.get(imagen.proveedor_id) ?? [];
      grupo.push(imagen);
      agrupadas.set(imagen.proveedor_id, grupo);
    }

    for (const proveedor of proveedores) {
      proveedor.imagenes = agrupadas.get(proveedor.id) ?? [];
    }

    return proveedores.map((proveedor) => this.toResponse(proveedor));
  }

  async findAll(): Promise<ProveedorResponseDto[]> {
    const proveedores = await this.repository.find({
      order: { id: 'ASC' },
    });

    return this.toResponses(proveedores);
  }

  async findOne(id: number): Promise<ProveedorResponseDto> {
    const proveedor = await this.repository.findOneBy({ id });

    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
    }

    const [respuesta] = await this.toResponses([proveedor]);
    return respuesta;
  }

  async create(dto: CreateProveedorDto): Promise<ProveedorResponseDto> {
    const email = dto.email.trim().toLowerCase();

    if (await this.usuariosRepository.existsBy({ email })) {
      throw new ConflictException('Ya existe un usuario con ese email');
    }

    if (await this.repository.existsBy({ email })) {
      throw new ConflictException('Ya existe un proveedor con ese email');
    }

    const rol = await this.rolesRepository.findOneBy({
      nombre: RolUsuario.PROVEEDOR,
    });

    if (!rol) {
      throw new NotFoundException('El rol PROVEEDOR no está configurado');
    }

    const passwordHash = await argon2.hash(dto.password, {
      type: argon2.argon2id,
    });

    try {
      return await this.repository.manager.transaction(async (manager) => {
        const usuariosRepo = manager.getRepository(Usuario);
        const proveedoresRepo = manager.getRepository(Proveedor);

        const usuario = await usuariosRepo.save(
          usuariosRepo.create({
            nombre: dto.nombreResponsable,
            apellido: dto.apellido,
            email,
            telefono: dto.telefono,
            password_hash: passwordHash,
            rol_id: rol.id,
          }),
        );

        const proveedor = await proveedoresRepo.save(
          proveedoresRepo.create({
            nombre: dto.nombre,
            descripcion: dto.descripcion,
            email,
            telefono: dto.telefono,
            usuario_id: usuario.id,
          }),
        );

        return this.toResponse(proveedor);
      });
    } catch (error: unknown) {
      this.manejarDuplicado(error);
      throw error;
    }
  }

  async update(
    id: number,
    dto: UpdateProveedorDto,
    usuario: JwtPayload,
  ): Promise<ProveedorResponseDto> {
    try {
      await this.repository.manager.transaction(async (manager) => {
        const proveedoresRepo = manager.getRepository(Proveedor);
        const usuariosRepo = manager.getRepository(Usuario);

        const proveedor = await proveedoresRepo.findOne({
          where: { id },
          lock: { mode: 'pessimistic_write' },
        });

        if (!proveedor) {
          throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
        }

        this.validarPropiedad(proveedor, usuario);

        if (dto.nombre !== undefined) proveedor.nombre = dto.nombre;
        if (dto.descripcion !== undefined) {
          proveedor.descripcion = dto.descripcion;
        }
        if (dto.email !== undefined) {
          proveedor.email = dto.email.trim().toLowerCase();
        }
        if (dto.telefono !== undefined) {
          proveedor.telefono = dto.telefono;
        }

        if (proveedor.usuario_id) {
          const usuarioAsociado = await usuariosRepo.findOneBy({
            id: proveedor.usuario_id,
          });

          if (usuarioAsociado) {
            if (dto.email !== undefined) {
              usuarioAsociado.email = proveedor.email!;
            }
            if (dto.telefono !== undefined) {
              usuarioAsociado.telefono = proveedor.telefono;
            }
            await usuariosRepo.save(usuarioAsociado);
          }
        }

        await proveedoresRepo.save(proveedor);
      });
    } catch (error: unknown) {
      this.manejarDuplicado(error);
      throw error;
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const proveedor = await this.repository.findOneBy({ id });

    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
    }

    await this.repository.delete(id);
  }

  private manejarDuplicado(error: unknown): void {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'ER_DUP_ENTRY'
    ) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }
  }

  async subirImagen(
    proveedorId: number,
    archivo: Express.Multer.File,
    usuario: JwtPayload,
  ): Promise<ImagenResponseDto> {
    const proveedor = await this.repository.findOneBy({ id: proveedorId });

    if (!proveedor) {
      throw new NotFoundException('Proveedor no encontrado');
    }

    this.validarPropiedad(proveedor, usuario);

    const archivoGuardado = await this.archivosService.guardarImagen(
      archivo,
      'proveedores',
    );

    try {
      return await this.repository.manager.transaction(async (manager) => {
        const proveedorBloqueado = await manager
          .getRepository(Proveedor)
          .findOne({
            where: { id: proveedorId },
            lock: { mode: 'pessimistic_write' },
          });

        if (!proveedorBloqueado) {
          throw new NotFoundException('Proveedor no encontrado');
        }

        this.validarPropiedad(proveedorBloqueado, usuario);

        const repo = manager.getRepository(Imagen);

        const cantidad = await repo.count({
          where: { proveedor_id: proveedorId },
        });

        const imagen = await repo.save(
          repo.create({
            producto_id: null,
            proveedor_id: proveedorId,
            nombre: archivoGuardado.nombre,
            ruta: archivoGuardado.ruta,
            mime_type: archivoGuardado.mimeType,
            tamano: String(archivoGuardado.tamano),
            es_principal: cantidad === 0,
          }),
        );

        return {
          id: imagen.id,
          ruta: imagen.ruta,
          esPrincipal: imagen.es_principal,
        };
      });
    } catch (error) {
      try {
        await this.archivosService.eliminarImagen(archivoGuardado.ruta);
      } catch {
        // Conservamos el error original.
      }
      throw error;
    }
  }

  async establecerImagenPrincipal(
    proveedorId: number,
    imagenId: number,
    usuario: JwtPayload,
  ): Promise<ImagenResponseDto> {
    return this.repository.manager.transaction(async (manager) => {
      const proveedor = await manager.getRepository(Proveedor).findOne({
        where: { id: proveedorId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!proveedor) {
        throw new NotFoundException('Proveedor no encontrado');
      }

      this.validarPropiedad(proveedor, usuario);

      const repo = manager.getRepository(Imagen);
      const imagen = await repo.findOne({
        where: { id: imagenId, proveedor_id: proveedorId },
      });

      if (!imagen) {
        throw new NotFoundException('Imagen no encontrada para este proveedor');
      }

      await repo.update(
        { proveedor_id: proveedorId, es_principal: true },
        { es_principal: false },
      );

      imagen.es_principal = true;
      const guardada = await repo.save(imagen);

      return {
        id: guardada.id,
        ruta: guardada.ruta,
        esPrincipal: guardada.es_principal,
      };
    });
  }

  async eliminarImagen(
    proveedorId: number,
    imagenId: number,
    usuario: JwtPayload,
  ): Promise<void> {
    const ruta = await this.repository.manager.transaction(async (manager) => {
      const proveedor = await manager.getRepository(Proveedor).findOne({
        where: { id: proveedorId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!proveedor) {
        throw new NotFoundException('Proveedor no encontrado');
      }

      this.validarPropiedad(proveedor, usuario);

      const repo = manager.getRepository(Imagen);
      const imagen = await repo.findOne({
        where: { id: imagenId, proveedor_id: proveedorId },
      });

      if (!imagen) {
        throw new NotFoundException('Imagen no encontrada para este proveedor');
      }

      await repo.remove(imagen);

      if (imagen.es_principal) {
        const siguiente = await repo.findOne({
          where: { proveedor_id: proveedorId },
          order: { id: 'ASC' },
        });

        if (siguiente) {
          siguiente.es_principal = true;
          await repo.save(siguiente);
        }
      }

      return imagen.ruta;
    });

    await this.archivosService.eliminarImagen(ruta);
  }
}
