
import { Injectable } from '@nestjs/common';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { ProveedorResponseDto } from './dto/proveedor-response.dto';

@Injectable()
export class ProveedoresService {
  private readonly proveedores: ProveedorResponseDto[] = [
    {
      id: 1,
      nombre: 'Mermeladas del Valle',
      descripcion: 'Productor artesanal de mermeladas.',
      email: 'contacto@mermeladasdelvalle.cl',
      telefono: '+56912345678',
    },
    {
      id: 2,
      nombre: 'Lácteos del Campo',
      descripcion: 'Productor local de quesos artesanales.',
      email: 'contacto@lacteosdelcampo.cl',
      telefono: '+56923456789',
    },
    {
      id: 3,
      nombre: 'Olivares de Chile',
      descripcion: 'Productor de aceite de oliva.',
      email: 'contacto@olivaresdechile.cl',
      telefono: '+56934567890',
    },
  ];

  findAll(): ProveedorResponseDto[] {
    return [...this.proveedores];
  }

  findOne(id: number): ProveedorResponseDto {
    return { ...this.proveedores[0] };
  }

  create(dto: CreateProveedorDto): ProveedorResponseDto {
    return { ...this.proveedores[0] };
  }

  update(
    id: number,
    dto: UpdateProveedorDto,
  ): ProveedorResponseDto {
    return { ...this.proveedores[0] };
  }

  remove(id: number): void {
    // Dummy: no elimina datos reales.
  }
}
