import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';
export class CreateDespachoDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  pedidoId: number;
  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  zonaId?: number;
}
