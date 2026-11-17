import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriasRepository: Repository<Categoria>,
  ) {}

  async create(dto: CreateCategoriaDto): Promise<Categoria> {
    const categoria = this.categoriasRepository.create(dto);

    try {
      return await this.categoriasRepository.save(categoria);
    } catch (error) {
      if (this.isDuplicate(error)) {
        throw new ConflictException('Ya existe una categoría con ese nombre');
      }
      throw error;
    }
  }

  async findAll(nombre?: string): Promise<Categoria[]> {
    const query = this.categoriasRepository.createQueryBuilder('categoria');

    if (nombre?.trim()) {
      query.where('categoria.nombre LIKE :nombre', {
        nombre: `%${nombre.trim()}%`,
      });
    }

    return query
      .orderBy(
        `CASE categoria.nombre
          WHEN 'Lácteos' THEN 1
          WHEN 'Mermeladas' THEN 2
          WHEN 'Aceites' THEN 3
          ELSE 4
        END`,
        'ASC',
      )
      .addOrderBy('categoria.nombre', 'ASC')
      .getMany();
  }

  async findTop(limite: number): Promise<Categoria[]> {
    return this.categoriasRepository
      .createQueryBuilder('categoria')
      .leftJoin('productos', 'producto', 'producto.categoria_id = categoria.id')
      .select('categoria')
      .groupBy('categoria.id')
      .orderBy('COUNT(producto.id)', 'DESC')
      .addOrderBy('categoria.id', 'ASC')
      .limit(Math.max(0, limite))
      .getMany();
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriasRepository.findOneBy({ id });

    if (!categoria) {
      throw new NotFoundException(`Categoría ${id} no encontrada`);
    }

    return categoria;
  }

  async update(id: number, dto: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.findOne(id);
    Object.assign(categoria, dto);

    try {
      return await this.categoriasRepository.save(categoria);
    } catch (error) {
      if (this.isDuplicate(error)) {
        throw new ConflictException('Ya existe una categoría con ese nombre');
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    const categoria = await this.findOne(id);

    try {
      await this.categoriasRepository.remove(categoria);
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'driverError' in error &&
        (error as { driverError?: { code?: string } }).driverError?.code ===
          'ER_ROW_IS_REFERENCED_2'
      ) {
        throw new ConflictException(
          'No se puede eliminar una categoría con productos asociados',
        );
      }
      throw error;
    }
  }

  private isDuplicate(error: unknown): boolean {
    return (
      typeof error === 'object' &&
      error !== null &&
      'driverError' in error &&
      (error as { driverError?: { code?: string } }).driverError?.code ===
        'ER_DUP_ENTRY'
    );
  }
}
