import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
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


  @ApiOperation({
    summary: 'Obtener usuario por ID',
    description: 'Obtiene un usuario específico mediante su identificador.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador único del usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario obtenido correctamente.',
    type: UsuarioResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El ID del usuario no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): UsuarioResponseDto {
    return {} as UsuarioResponseDto;
  }


  @ApiOperation({
    summary: 'Crear usuario',
    description: 'Crea un nuevo usuario.',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado correctamente.',
    type: UsuarioResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Los datos del usuario no son válidos.',
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe un usuario con los datos proporcionados.',
  })
  @Post()
  create(
    @Body() createUsuarioDto: CreateUsuarioDto,
  ): UsuarioResponseDto {
    return {} as UsuarioResponseDto;
  }


  @ApiOperation({
    summary: 'Actualizar usuario',
    description: 'Actualiza parcialmente los datos de un usuario existente.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador único del usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado correctamente.',
    type: UsuarioResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'El ID o los datos del usuario no son válidos.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe un usuario con los datos proporcionados.',
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ): UsuarioResponseDto {
    return {} as UsuarioResponseDto;
  }

  @ApiOperation({
    summary: 'Eliminar usuario',
    description: 'Elimina un usuario mediante su identificador.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Identificador único del usuario',
  })
  @ApiResponse({
    status: 204,
    description: 'Usuario eliminado correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'El ID del usuario no es válido.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ): void {}


}
