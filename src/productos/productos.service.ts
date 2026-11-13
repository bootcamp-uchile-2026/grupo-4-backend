
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Producto } from './entities/producto.entity';
import { Proveedor } from '../proveedores/entities/proveedor.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ProductoQueryDto } from './dto/producto-query.dto';
import { ProductoResponseDto } from './dto/producto-response.dto';
import { TipoConservacion } from './enums/tipo-conservacion.enum';
import { RolUsuario } from '../usuarios/enums/rol-usuario.enum';
import type { JwtPayload } from '../autenticacion/guards/auth.guard';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly repository: Repository<Producto>,

    @InjectRepository(Proveedor)
    private readonly proveedoresRepository: Repository<Proveedor>,
  ) {}

  private async obtenerProveedorId(usuario: JwtPayload): Promise<number> {
    const proveedor = await this.proveedoresRepository.findOne({
      where: { usuario_id: usuario.sub },
    });

    if (!proveedor) {
      throw new ForbiddenException(
        'El usuario no tiene un proveedor asociado',
      );
    }

    return proveedor.id;
  }

  private async validarPropiedad(
    producto: Producto,
    usuario: JwtPayload,
  ): Promise<void> {
    if (usuario.role === RolUsuario.ADMIN) {
      return;
    }

    if (usuario.role !== RolUsuario.PROVEEDOR) {
      throw new ForbiddenException(
        'No tienes permisos para gestionar productos',
      );
    }

    const proveedorId = await this.obtenerProveedorId(usuario);

    if (producto.proveedor_id !== proveedorId) {
      throw new ForbiddenException(
        'No tienes permisos para modificar este producto',
      );
    }
  }

  private toResponse(
    producto: Producto,
    valoracion = 0,
  ): ProductoResponseDto {
    const precio = Number(producto.precio);
    const descuento = Number(producto.descuento);

    return {
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion ?? '',
      ingredientes: producto.ingredientes ?? '',
      valorNutricional: producto.valor_nutricional ?? '',
      categoriaId: producto.categoria_id,
      proveedorId: producto.proveedor_id,
      precio,
      fechaVencimiento: producto.fecha_vencimiento
        ? new Date(producto.fecha_vencimiento)
        : null!,
      descuento,
      precioDescuento:
        Math.round(precio * (1 - descuento / 100) * 100) / 100,
      imagen: producto.imagen ?? '',
      tipoConservacion: (producto.tipo_conservacion ??
        TipoConservacion.AMBIENTE) as TipoConservacion,
      valoracion,
      favorito: producto.favorito,
    };
  }

  private async toResponses(
    productos: Producto[],
  ): Promise<ProductoResponseDto[]> {
    if (productos.length === 0) return [];

    const ids = productos.map((producto) => producto.id);

    const valoraciones = await this.repository.manager
      .createQueryBuilder()
      .select('resena.producto_id', 'productoId')
      .addSelect('AVG(resena.estrellas)', 'promedio')
      .from('resenas', 'resena')
      .where('resena.producto_id IN (:...ids)', { ids })
      .groupBy('resena.producto_id')
      .getRawMany<{
        productoId: number;
        promedio: string;
      }>();

    const promedios = new Map(
      valoraciones.map((item) => [
        Number(item.productoId),
        Math.round(Number(item.promedio) * 100) / 100,
      ]),
    );

    return productos.map((producto) =>
      this.toResponse(producto, promedios.get(producto.id) ?? 0),
    );
  }

  async findAll(
    query: ProductoQueryDto,
  ): Promise<ProductoResponseDto[]> {
    const qb = this.repository
      .createQueryBuilder('producto')
      .where('producto.activo = :activo', { activo: true });

    if (query.nombre !== undefined) {
      qb.andWhere('producto.nombre LIKE :nombre', {
        nombre: `%${query.nombre.trim()}%`,
      });
    }

    if (query.categoriaId !== undefined) {
      qb.andWhere('producto.categoria_id = :categoriaId', {
        categoriaId: query.categoriaId,
      });
    }

    if (query.proveedorId !== undefined) {
      qb.andWhere('producto.proveedor_id = :proveedorId', {
        proveedorId: query.proveedorId,
      });
    }

    if (query.precioMin !== undefined) {
      qb.andWhere('producto.precio >= :precioMin', {
        precioMin: query.precioMin,
      });
    }

    if (query.precioMax !== undefined) {
      qb.andWhere('producto.precio <= :precioMax', {
        precioMax: query.precioMax,
      });
    }

    if (
      query.precioMin !== undefined &&
      query.precioMax !== undefined &&
      query.precioMin > query.precioMax
    ) {
      throw new BadRequestException(
        'precioMin no puede ser mayor que precioMax',
      );
    }

    if (query.tipoConservacion !== undefined) {
      qb.andWhere(
        'producto.tipo_conservacion = :tipoConservacion',
        {
          tipoConservacion: query.tipoConservacion,
        },
      );
    }

    if (query.tieneDescuento !== undefined) {
      qb.andWhere(
        query.tieneDescuento
          ? 'producto.descuento > 0'
          : 'producto.descuento = 0',
      );
    }

    const productos = await qb
      .orderBy('producto.id', 'ASC')
      .getMany();

    return this.toResponses(productos);
  }

  async findTopVentas(
    limite: number,
  ): Promise<ProductoResponseDto[]> {
    if (!Number.isInteger(limite) || limite < 1) {
      throw new BadRequestException(
        'limite debe ser un entero mayor a 0',
      );
    }

    const productos = await this.repository
      .createQueryBuilder('producto')
      .leftJoin(
        'pedido_items',
        'item',
        'item.producto_id = producto.id',
      )
      .where('producto.activo = :activo', { activo: true })
      .groupBy('producto.id')
      .orderBy('COALESCE(SUM(item.cantidad), 0)', 'DESC')
      .addOrderBy('producto.id', 'ASC')
      .limit(limite)
      .getMany();

    return this.toResponses(productos);
  }

  async findOne(id: number): Promise<ProductoResponseDto> {
    const producto = await this.repository.findOne({
      where: { id, activo: true },
    });

    if (!producto) {
      throw new NotFoundException(
        `Producto con ID ${id} no encontrado`,
      );
    }

    const [respuesta] = await this.toResponses([producto]);
    return respuesta;
  }

  async create(
    dto: CreateProductoDto,
    usuario: JwtPayload,
  ): Promise<ProductoResponseDto> {
    let proveedorId = dto.proveedorId;

    if (usuario.role === RolUsuario.PROVEEDOR) {
      proveedorId = await this.obtenerProveedorId(usuario);
    } else if (usuario.role === RolUsuario.ADMIN) {
      if (proveedorId === undefined) {
        throw new BadRequestException(
          'proveedorId es obligatorio para administradores',
        );
      }
    } else {
      throw new ForbiddenException(
        'No tienes permisos para crear productos',
      );
    }

    const producto = this.repository.create({
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      ingredientes: dto.ingredientes,
      valor_nutricional: dto.valorNutricional ?? null,
      categoria_id: dto.categoriaId,
      proveedor_id: proveedorId,
      precio: String(dto.precio),
      descuento: String(dto.descuento ?? 0),
      fecha_vencimiento: dto.fechaVencimiento ?? null,
      imagen: dto.imagen ?? null,
      tipo_conservacion: dto.tipoConservacion,
      favorito: dto.favorito ?? false,
      stock_cantidad: 0,
      stock_minimo: 0,
      activo: true,
    });

    const guardado = await this.repository.save(producto);
    const [respuesta] = await this.toResponses([guardado]);
    return respuesta;
  }

  async update(
    id: number,
    dto: UpdateProductoDto,
    usuario: JwtPayload,
  ): Promise<ProductoResponseDto> {
    const producto = await this.repository.findOne({
      where: { id, activo: true },
    });

    if (!producto) {
      throw new NotFoundException(
        `Producto con ID ${id} no encontrado`,
      );
    }

    await this.validarPropiedad(producto, usuario);

    if (
      usuario.role === RolUsuario.PROVEEDOR &&
      dto.proveedorId !== undefined &&
      dto.proveedorId !== producto.proveedor_id
    ) {
      throw new ForbiddenException(
        'No puedes cambiar el proveedor de un producto',
      );
    }

    if (dto.nombre !== undefined) {
      producto.nombre = dto.nombre;
    }

    if (dto.descripcion !== undefined) {
      producto.descripcion = dto.descripcion;
    }

    if (dto.ingredientes !== undefined) {
      producto.ingredientes = dto.ingredientes;
    }

    if (dto.valorNutricional !== undefined) {
      producto.valor_nutricional = dto.valorNutricional;
    }

    if (dto.categoriaId !== undefined) {
      producto.categoria_id = dto.categoriaId;
    }

    if (
      dto.proveedorId !== undefined &&
      usuario.role === RolUsuario.ADMIN
    ) {
      producto.proveedor_id = dto.proveedorId;
    }

    if (dto.precio !== undefined) {
      producto.precio = String(dto.precio);
    }

    if (dto.descuento !== undefined) {
      producto.descuento = String(dto.descuento);
    }

    if (dto.fechaVencimiento !== undefined) {
      producto.fecha_vencimiento = dto.fechaVencimiento;
    }

    if (dto.imagen !== undefined) {
      producto.imagen = dto.imagen;
    }

    if (dto.tipoConservacion !== undefined) {
      producto.tipo_conservacion = dto.tipoConservacion;
    }

    if (dto.favorito !== undefined) {
      producto.favorito = dto.favorito;
    }

    const guardado = await this.repository.save(producto);
    const [respuesta] = await this.toResponses([guardado]);
    return respuesta;
  }

  async remove(
    id: number,
    usuario: JwtPayload,
  ): Promise<void> {
    const producto = await this.repository.findOne({
      where: { id, activo: true },
    });

    if (!producto) {
      throw new NotFoundException(
        `Producto con ID ${id} no encontrado`,
      );
    }

    await this.validarPropiedad(producto, usuario);

    producto.activo = false;
    await this.repository.save(producto);
  }
}
