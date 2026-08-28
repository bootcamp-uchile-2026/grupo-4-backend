import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({
    example: 'Mermeladas',
    description: 'Nombre de la categoría',
  })
  nombre: string;
}