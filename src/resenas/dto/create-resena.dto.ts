import { ApiProperty } from "@nestjs/swagger";

export class CreateResenaDto {

    @ApiProperty({
        example: 1,
        description: 'Id del cliente asociado a la reseña',
    })
    clienteId: number;

    @ApiProperty({
        example: 2,
        description: 'Id del producto asociado a la reseña',
    })
    productoId: number;

    @ApiProperty({
        example: 'El mejor producto de la vida',
        description: 'Título de la reseña',
    })
    titulo: string;

    @ApiProperty({
        example: 'Este producto me ha ayudado con...',
        description: 'Detalle de la reseña',
    })
    detalle: string;

    @ApiProperty({
        example: 3,
        minimum: 1,
        maximum: 5,
        description: 'Rating asociado a la reseña. De 1 a 5 estrellas.',
    })
    estrellas: string;
}
