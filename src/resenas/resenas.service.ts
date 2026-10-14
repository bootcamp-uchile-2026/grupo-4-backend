
import { Injectable } from '@nestjs/common';
import { CreateResenaDto } from './dto/create-resena.dto';
import { UpdateResenaDto } from './dto/update-resena.dto';
import { ResenaQueryDto } from './dto/resena-query.dto';
import { ResenaResponseDto } from './dto/resena-response.dto';

@Injectable()
export class ResenasService {
  private readonly resenas: ResenaResponseDto[] = [
    {
      id: 1,
      clienteId: 1,
      productoId: 1,
      titulo: 'Excelente mermelada',
      detalle: 'Muy buen sabor y textura.',
      estrellas: 5,
    },
    {
      id: 2,
      clienteId: 2,
      productoId: 2,
      titulo: 'Buen producto',
      detalle: 'Queso fresco y de buena calidad.',
      estrellas: 4,
    },
    {
      id: 3,
      clienteId: 1,
      productoId: 3,
      titulo: 'Muy recomendado',
      detalle: 'Buen aceite para cocinar y aliñar.',
      estrellas: 5,
    },
  ];

  findAll(query: ResenaQueryDto): ResenaResponseDto[] {
    return [...this.resenas];
  }

  findOne(id: number): ResenaResponseDto {
    return { ...this.resenas[0] };
  }

  create(dto: CreateResenaDto): ResenaResponseDto {
    return { ...this.resenas[0] };
  }

  update(
    id: number,
    dto: UpdateResenaDto,
  ): ResenaResponseDto {
    return { ...this.resenas[0] };
  }

  remove(id: number): void {
    // Dummy: no elimina datos reales.
  }
}
