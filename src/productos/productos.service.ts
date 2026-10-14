
import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ProductoQueryDto } from './dto/producto-query.dto';
import { ProductoResponseDto } from './dto/producto-response.dto';
import { TipoConservacion } from './enums/tipo-conservacion.enum';

@Injectable()
export class ProductosService {
  private readonly productos: ProductoResponseDto[] = [
    {
      id: 1,
      nombre: 'Mermelada de frutilla',
      descripcion: 'Mermelada artesanal elaborada con frutillas.',
      ingredientes: 'Frutillas, azúcar y jugo de limón.',
      valorNutricional: 'No informado',
      categoriaId: 1,
      proveedorId: 1,
      precio: 5000,
      fechaVencimiento: new Date('2027-12-31'),
      descuento: 10,
      precioDescuento: 4500,
      imagen: 'https://placehold.co/600x400',
      tipoConservacion: TipoConservacion.AMBIENTE,
      valoracion: 5,
      favorito: true,
    },
    {
      id: 2,
      nombre: 'Queso de campo',
      descripcion: 'Queso artesanal elaborado por productores locales.',
      ingredientes: 'Leche, sal y cultivos lácticos.',
      valorNutricional: 'No informado',
      categoriaId: 2,
      proveedorId: 2,
      precio: 7500,
      fechaVencimiento: new Date('2027-06-30'),
      descuento: 0,
      precioDescuento: 7500,
      imagen: 'https://placehold.co/600x400',
      tipoConservacion: TipoConservacion.REFRIGERADO,
      valoracion: 4,
      favorito: false,
    },
    {
      id: 3,
      nombre: 'Aceite de oliva',
      descripcion: 'Aceite de oliva de producción artesanal.',
      ingredientes: 'Aceitunas.',
      valorNutricional: 'No informado',
      categoriaId: 3,
      proveedorId: 3,
      precio: 9000,
      fechaVencimiento: new Date('2027-12-31'),
      descuento: 0,
      precioDescuento: 9000,
      imagen: 'https://placehold.co/600x400',
      tipoConservacion: TipoConservacion.AMBIENTE,
      valoracion: 5,
      favorito: false,
    },
  ];

  findAll(query: ProductoQueryDto): ProductoResponseDto[] {
    return [...this.productos];
  }

  findTopVentas(limite: number): ProductoResponseDto[] {
    return [...this.productos];
  }

  findOne(id: number): ProductoResponseDto {
    return { ...this.productos[0] };
  }

  create(dto: CreateProductoDto): ProductoResponseDto {
    return { ...this.productos[0] };
  }

  update(
    id: number,
    dto: UpdateProductoDto,
  ): ProductoResponseDto {
    return { ...this.productos[0] };
  }

  remove(id: number): void {
    // Dummy: no elimina datos reales.
  }
}
