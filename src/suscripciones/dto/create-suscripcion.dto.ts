import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateSuscripcionDto {

    @ApiProperty({
        type: String,
        example: 'Esta caja satisfacerá tus deseos en cuanto a...',
        description: 'Descripción de la suscripción',
    })
    @IsString({ message: 'descripcion debe ser un dato string' })
    @IsNotEmpty({ message: 'descripcion es un valor requerido' })
    descripcion: string;

    @ApiProperty({
        type: String,
        example: 'Caja Básica - Vinos',
        description: 'Nombre de la suscripción. Debe ser único.',
    })
    @IsString({ message: 'nombre debe ser un dato string' })
    @IsNotEmpty({ message: 'nombre es un valor requerido' })
    nombre: string;

    @ApiProperty({
        type: Number,
        example: 19990,
        minimum: 1,
        description: 'Precio mensual de la suscripción',
    })
    @IsInt({ message: 'precio debe ser un número entero' })
    @Min(1, { message: 'precio debe ser mayor o igual a 1' })
    @IsNotEmpty({ message: 'precio es un valor requerido' })
    @Type(() => Number)
    precio: number;

    @ApiProperty({
        type: [String],
        example: ['safdasdvdavda', 'sfcsadvdv123'],
        minItems: 1,
        description: 'Ids de los productos incluidos en la suscripción',
    })
    @IsArray({ message: 'productosId debe ser una lista de strings' })
    @ArrayMinSize(1, { message: 'productosId debe tener como minimo 1 item' })
    @IsString({ each: true, message: 'cada elemento de productosId debe ser un dato string' })
    productosId: string[];

}
