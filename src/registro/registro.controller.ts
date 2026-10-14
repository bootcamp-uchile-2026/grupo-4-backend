import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsuarioResponseDto } from '../usuarios/dto/usuarios-response.dto';
import { RegistroDto } from './dto/registro.dto';
import { RegistroService } from './registro.service';

@ApiTags('Registro')
@Controller('registro')
export class RegistroController {
  constructor(private readonly registroService: RegistroService) {}

  @ApiOperation({
    summary: 'Registrar usuario',
    description:
      'Crea una cuenta de usuario nueva a partir de los datos de registro.',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado correctamente.',
    type: UsuarioResponseDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'Los datos de registro no son válidos o las contraseñas no coinciden.',
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe un usuario con ese email.',
  })
  @Post()
  registrar(@Body() registroDto: RegistroDto): UsuarioResponseDto {
    return this.registroService.registrar(registroDto);
  }
}
