import { ApiProperty } from "node_modules/@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsInt, IsPositive, IsString, IsNotEmpty, IsNumber, Min, IsEnum } from "class-validator";
import { TipoConservacion } from "src/productos/enums/tipo-conservacion.enum";

export class ItemsCarritoResponseDto {

    @ApiProperty({
    example: 2,
    minimum: 1,
    description: 'Identificador único del producto',
    })
    @IsInt({ message: 'El itemId debe ser un número entero' })
    @IsPositive({ message: 'El itemId debe ser un número positivo' })
    itemId: number;

    @ApiProperty({
    example: 'Mermelada de frutilla',
    description: 'Nombre del producto',
    })
    @IsString()
    @IsNotEmpty()
    itemName: string;

    @ApiProperty({
    example: 5990,
    minimum: 0,
    description: 'Precio unitario vigente (con descuento si aplica)',
    })
    @IsNumber()
    @Min(0)
    unitPrice: number;

    @ApiProperty({
    example: 2,
    minimum: 1,
    description: 'Cantidad de unidades del producto en el carrito',
    })
    @IsInt({ message: 'La cantidad debe ser un número entero' })
    @Min(1, { message: 'La cantidad debe ser al menos 1' })
    cantidad: number;

    @ApiProperty({
    example: 11980,
    minimum: 0,
    description: 'Subtotal correspondiente al producto (precio unitario × cantidad)',
    })
    @IsNumber({}, { message: 'El subtotal debe ser un número' })
    @Min(0, { message: 'El subtotal no puede ser negativo' })
    subtotal: number;

    @ApiProperty({
    enum: TipoConservacion,
    description: 'Tipo de conservación del producto (define el tipo de despacho)',
    })
    @IsEnum(TipoConservacion)
    tipoConservacion: TipoConservacion;
}
