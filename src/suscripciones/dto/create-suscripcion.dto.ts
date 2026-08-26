import { ApiProperty } from "@nestjs/swagger";

export class CreateSuscripcionDto {

    @ApiProperty({
        example: 'Esta caja satisfacerá tus deseos en cuanto a...',
        description: 'Descripción de la suscripción',
    })
    descripcion: string;

    @ApiProperty({
        example: 'Caja Básica - Vinos',
        description: 'Nombre de la suscripción',
    })

    nombre: string;

    @ApiProperty({
        example: 19990,
        description: 'Precio mensual de la caja',
        minimum: 1,
    })
    precio: number;

    @ApiProperty({
        example: [1, 2, 3, 5],
        description: 'Lista de ids de los productos',
    })
    productosId: number[];

}
