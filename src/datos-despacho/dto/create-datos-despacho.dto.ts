import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength, } from 'class-validator';
import { CreateDireccionDto } from '../../direcciones/dto/create-direccion.dto';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

export class CreateDatoDespachoDto extends CreateDireccionDto {
  @ApiProperty({
    example: 'Casa',
    description: 'Nombre para identificar esta dirección',
    maxLength: 50,
  })
  @Transform(trim)
  @IsString({ message: 'alias debe ser un texto' })
  @IsNotEmpty({ message: 'alias no puede estar vacío' })
  @MaxLength(50, { message: 'alias no puede superar los 50 caracteres' })
  alias: string;

  @ApiProperty({
    example: 'María González',
    description: 'Nombre de la persona que recibirá el pedido',
    maxLength: 100,
  })
  @Transform(trim)
  @IsString({ message: 'nombreReceptor debe ser un texto' })
  @IsNotEmpty({ message: 'nombreReceptor no puede estar vacío' })
  @MaxLength(100, { message: 'nombreReceptor no puede superar los 100 caracteres' })
  nombreReceptor: string;

  @ApiProperty({
    example: '+56912345678',
    description: 'Teléfono de contacto para la entrega',
    maxLength: 20,
  })
  @Transform(trim)
  @IsPhoneNumber('CL', { message: 'telefono debe ser un número chileno válido' })
  @MaxLength(20, { message: 'telefono no puede superar los 20 caracteres' })
  telefono: string;

  @ApiPropertyOptional({
    example: 'Dejar con conserje. Producto refrigerado.',
    description: 'Indicaciones para el repartidor',
    maxLength: 255,
  })
  @IsOptional( { message: 'instrucciones es opcional' })
  @Transform(trim)
  @IsString({ message: 'instrucciones debe ser un texto' })
  @MaxLength(255, { message: 'instrucciones no puede superar los 255 caracteres' })
  instrucciones?: string;

  @ApiPropertyOptional({
    example: false,
    default: false,
    description: 'Marca esta dirección como la predeterminada del usuario',
  })
  @IsOptional( { message: 'esPredeterminado es opcional' })
  @IsBoolean({ message: 'esPredeterminado debe ser verdadero o falso' })
  esPredeterminado?: boolean;
}