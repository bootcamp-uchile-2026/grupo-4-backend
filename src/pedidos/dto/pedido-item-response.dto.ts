import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class PedidoItemResponseDto {
  @ApiProperty({
    example: 2,
    minimum: 1,
    description: 'Identificador único del producto',
  })
  @IsInt({ message: 'productoId debe ser un número entero' }) // Validar que sea un número entero
  @IsPositive({ message: 'productoId debe ser mayor que 0' }) // Validar que sea un número positivo
  @Min(1, { message: 'productoId debe ser al menos 1' }) // Validar que sea al menos 1
  productoId: number;

  @ApiProperty({
    example: 'Mermelada de frutilla',
    description: 'Nombre del producto',
  })
  @IsString({ message: 'productoNombre debe ser una cadena de texto' }) // Validar que sea una cadena de texto
  @IsNotEmpty({ message: 'productoNombre no debe estar vacío' }) // Validar que no esté vacío
  productoNombre: string;

  @ApiProperty({
    example: 5990,
    minimum: 0,
    description: 'Precio unitario del producto al momento de realizar el pedido',
  })
  @IsNumber({},{ message: 'precioUnitario debe ser un número' }) // Validar que sea un número
  @Min(0, { message: 'precioUnitario debe ser al menos 0' }) // Validar que sea al menos 0
  precioUnitario: number;

  @ApiProperty({
    example: 2,
    minimum: 1,
    description: 'Cantidad de unidades del producto',
  })
  @IsInt({ message: 'cantidad debe ser un número entero' }) // Validar que sea un número entero
  @Min(1, { message: 'cantidad debe ser al menos 1' }) // Validar que sea al menos 1
  cantidad: number;

  @ApiProperty({
    example: 11980,
    minimum: 0,
    description: 'Subtotal correspondiente al producto',
  })
  @IsNumber({}, { message: 'subtotal debe ser un número' }) // Validar que sea un número
  @Min(0, { message: 'subtotal debe ser al menos 0' }) // Validar que sea al menos 0
  subtotal: number;
}