import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfirmarRecuperacionDto } from './dto/confirmar-recuperacion.dto';
import { MensajeResponseDto } from './dto/mensaje-response.dto';
import { SolicitarRecuperacionDto } from './dto/solicitar-recuperacion.dto';
import { SolicitudRecuperacionResponseDto } from './dto/solicitud-recuperacion-response.dto';
import { RecuperacionPasswordService } from './recuperacion-password.service';

@ApiTags('Recuperación de contraseña')
@Controller('recuperacion-password')
export class RecuperacionPasswordController {
  constructor(
    private readonly recuperacionPasswordService: RecuperacionPasswordService,
  ) {}

  @ApiOperation({
    summary: 'Solicitar recuperación de contraseña',
    description:
      'Genera un token de recuperación para la cuenta del email indicado. El token dura 15 minutos y reemplaza a los anteriores de esa cuenta.',
  })
  @ApiResponse({
    status: 201,
    description: 'Solicitud de recuperación creada correctamente.',
    type: SolicitudRecuperacionResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El email no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'No existe un usuario con ese email.',
  })
  @Post()
  solicitar(
    @Body() solicitarRecuperacionDto: SolicitarRecuperacionDto,
  ): SolicitudRecuperacionResponseDto {
    return this.recuperacionPasswordService.solicitar(solicitarRecuperacionDto);
  }

  @ApiOperation({
    summary: 'Confirmar recuperación de contraseña',
    description:
      'Cambia la contraseña de la cuenta usando un token de recuperación vigente.',
  })
  @ApiResponse({
    status: 200,
    description: 'Contraseña actualizada correctamente.',
    type: MensajeResponseDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'Los datos no son válidos, o el token expiró o ya no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'El token no existe.',
  })
  @HttpCode(200)
  @Post('confirmar')
  confirmar(
    @Body() confirmarRecuperacionDto: ConfirmarRecuperacionDto,
  ): MensajeResponseDto {
    return this.recuperacionPasswordService.confirmar(confirmarRecuperacionDto);
  }
}
