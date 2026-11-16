import { ApiProperty } from '@nestjs/swagger';
import { ImagenResponseDto } from '../../archivos/dto/imagen-response.dto';

export class ProveedorResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Mermeladas del Valle' })
  nombre: string;

  @ApiProperty({ example: 'Productor artesanal de mermeladas.' })
  descripcion: string;

  @ApiProperty({ example: 'contacto@mermeladasdelvalle.cl' })
  email: string;

  @ApiProperty({ example: '+56912345678' })
  telefono: string;

  @ApiProperty({ type: () => ImagenResponseDto, isArray: true })
  imagenes: ImagenResponseDto[];
}
