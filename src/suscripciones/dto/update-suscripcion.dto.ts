import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateSuscripcionDto } from './create-suscripcion.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateSuscripcionDto extends PartialType(CreateSuscripcionDto) {


    @ApiPropertyOptional({
        type: Boolean,
        example: true,
        description: 'Estado de la suscripción, activa o deshabilitada.',
    })
    @IsOptional()
    @IsBoolean({ message: 'activa debe ser un valor booleano' })
    activa?: boolean
}
