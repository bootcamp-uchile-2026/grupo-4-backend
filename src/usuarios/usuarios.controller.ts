import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsuarioResponseDto } from './dto/usuarios-response.dto';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @ApiOperation({
    summary: 'Obtener usuarios',
    description: 'Obtiene una lista de usuarios.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida correctamente.',
    type: UsuarioResponseDto,
    isArray: true,
  })
  @Get()
  findAll(): UsuarioResponseDto[] {
    return [];
  }



}
