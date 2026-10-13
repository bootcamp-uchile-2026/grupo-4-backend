import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { DireccionResponseDto } from '../../direcciones/dto/direccion-response.dto'; 

export class DatoDespachoResponseDto extends DireccionResponseDto {
  @ApiProperty({ example: 'Casa', description: 'Nombre para identificar esta dirección' })
  @IsString( { message: 'alias debe ser un texto' })
  @IsNotEmpty({ message: 'alias no puede estar vacío' })
  alias: string;

  @ApiProperty({ example: 'María González', description: 'Nombre de quien recibe el pedido' })
  @IsString({ message: 'nombreReceptor debe ser un texto' })
  @IsNotEmpty({ message: 'nombreReceptor no puede estar vacío' })
  nombreReceptor: string;

  @ApiProperty({ example: '+56912345678', description: 'Teléfono de contacto' })
  @IsString({ message: 'telefono debe ser un texto' })
  @IsNotEmpty({ message: 'telefono no puede estar vacío' })
  telefono: string;

  @ApiPropertyOptional({
    example: 'Dejar con conserje. Producto refrigerado.',
    nullable: true,
    description: 'Indicaciones para el repartidor',
  })
  @IsOptional({ message: 'instrucciones es opcional' })
  @IsString({ message: 'instrucciones debe ser un texto' })
  instrucciones: string | null;

  @ApiProperty({ example: true, description: 'Indica si es la dirección predeterminada' })
  @IsBoolean({ message: 'esPredeterminado debe ser verdadero o falso' })
  esPredeterminado: boolean;
}