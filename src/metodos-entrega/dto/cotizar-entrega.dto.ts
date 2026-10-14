import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested, } from 'class-validator';
import { CreatePedidoItemDto } from 'src/pedidos/dto/create-pedido-item.dto';


export class CotizarEntregaDto {
  @ApiProperty({ 
    type: () => [CreatePedidoItemDto], 
    description: 'Productos a despachar' 
  })
  @IsArray({ message: 'items debe ser un arreglo' })
  @ArrayNotEmpty({ message: 'Debes incluir al menos un producto' })
  @ValidateNested({ each: true })
  @Type(() => CreatePedidoItemDto)
  items: CreatePedidoItemDto[];

  @ApiPropertyOptional({
    example: 'Providencia',
    maxLength: 100,
    description: 'Comuna de despacho (necesaria para entregas a domicilio)',
  })
  @IsOptional({ message: 'comuna es opcional' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'comuna debe ser un texto' })
  @IsNotEmpty({ message: 'comuna no puede estar vacía' })
  @MaxLength(100, { message: 'comuna no puede superar los 100 caracteres' })
  comuna?: string;
}