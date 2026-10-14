import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfirmarVerificacionDto } from './dto/confirmar-verificacion.dto';
import { EstadoVerificacionQueryDto } from './dto/estado-verificacion-query.dto';
import { EstadoVerificacionResponseDto } from './dto/estado-verificacion-response.dto';
import { SolicitarVerificacionDto } from './dto/solicitar-verificacion.dto';
import { VerificacionCorreoResponseDto } from './dto/verificacion-correo-response.dto';
import { VerificacionCorreoService } from './verificacion-correo.service';

@ApiTags('Verificación de correo electrónico')
@Controller('verificacion-correo')
export class VerificacionCorreoController {
  constructor(
    private readonly verificacionCorreoService: VerificacionCorreoService,
  ) {}

  @ApiOperation({
    summary: 'Solicitar verificación de correo',
    description:
      'Genera un token de verificación para el correo indicado. El token dura 24 horas y reemplaza al anterior si había uno pendiente.',
  })
  @ApiResponse({
    status: 201,
    description: 'Verificación creada correctamente.',
    type: VerificacionCorreoResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El email no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'No existe un usuario con ese email.',
  })
  @ApiResponse({
    status: 409,
    description: 'El correo ya está verificado.',
  })
  @Post()
  solicitar(
    @Body() solicitarVerificacionDto: SolicitarVerificacionDto,
  ): VerificacionCorreoResponseDto {
    return this.verificacionCorreoService.solicitar(solicitarVerificacionDto);
  }

  @ApiOperation({
    summary: 'Confirmar verificación de correo',
    description: 'Marca el correo como verificado usando un token vigente.',
  })
  @ApiResponse({
    status: 200,
    description: 'Correo verificado correctamente.',
    type: EstadoVerificacionResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El token no tiene un formato válido o expiró.',
  })
  @ApiResponse({
    status: 404,
    description: 'El token no existe.',
  })
  @ApiResponse({
    status: 409,
    description: 'El correo ya está verificado.',
  })
  @HttpCode(200)
  @Post('confirmar')
  confirmar(
    @Body() confirmarVerificacionDto: ConfirmarVerificacionDto,
  ): EstadoVerificacionResponseDto {
    return this.verificacionCorreoService.confirmar(confirmarVerificacionDto);
  }

  @ApiOperation({
    summary: 'Consultar estado de verificación',
    description: 'Indica si el correo de un usuario ya fue verificado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Estado obtenido correctamente.',
    type: EstadoVerificacionResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El email no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'No existe un usuario con ese email.',
  })
  @Get('estado')
  estado(
    @Query() query: EstadoVerificacionQueryDto,
  ): EstadoVerificacionResponseDto {
    return this.verificacionCorreoService.estado(query.email);
  }
}
