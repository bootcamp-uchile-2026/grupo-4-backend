import { ApiProperty } from '@nestjs/swagger';

export class PedidoItemResponseDto {
  @ApiProperty({
    example: 2,
    minimum: 1,
    description: 'Identificador único del producto',
  })
  productoId: number;

  @ApiProperty({
    example: 'Mermelada de frutilla',
    description: 'Nombre del producto',
  })
  productoNombre: string;

  @ApiProperty({
    example: 5990,
    minimum: 0,
    description: 'Precio unitario del producto al momento de realizar el pedido',
  })
  precioUnitario: number;

  @ApiProperty({
    example: 2,
    minimum: 1,
    description: 'Cantidad de unidades del producto',
  })
  cantidad: number;

  @ApiProperty({
    example: 11980,
    minimum: 0,
    description: 'Subtotal correspondiente al producto',
  })
  subtotal: number;
}