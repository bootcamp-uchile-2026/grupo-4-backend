import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class AsignarRolDto {
  @ApiProperty({
    example: 2,
    description: 'ID del rol que se asignará al usuario',
  })
  @IsInt()
  @Min(1)
  rol_id!: number;
}
