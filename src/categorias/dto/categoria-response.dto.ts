import { ApiProperty } from '@nestjs/swagger';

export class CategoriaResponseDto {
  @ApiProperty({
    example: 1,
    minimum: 1,
    description: 'Identificador único de la categoría',
  })
  id: number;

  @ApiProperty({
    example: 'Mermeladas',
    description: 'Nombre de la categoría',
  })
  nombre: string;
}