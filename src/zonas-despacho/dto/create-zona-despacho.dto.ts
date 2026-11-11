import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateZonaDespachoDto {
  @ApiProperty({ example: 'Santiago Oriente' })
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
