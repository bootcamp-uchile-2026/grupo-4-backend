import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UsuariosService } from './usuarios.service';
import { CreateUsuarioAdminDto } from './dto/create-usuario-admin.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioResponseDto } from './dto/usuarios-response.dto';

import { AuthGuard } from '../autenticacion/guards/auth.guard';
import { RolesGuard } from '../autenticacion/guards/roles.guard';
import { Roles } from '../autenticacion/decorators/roles.decorator';
import { RolUsuario } from './enums/rol-usuario.enum';

@ApiTags('Usuarios')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(RolUsuario.ADMIN)
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
  @ApiResponse({ status: 401, description: 'No autenticado.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  @Get()
  findAll(): Promise<UsuarioResponseDto[]> {
    return this.usuariosService.findAll();
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
  @ApiResponse({ status: 400, description: 'El ID del usuario no es válido.' })
  @ApiResponse({ status: 401, description: 'No autenticado.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UsuarioResponseDto> {
    return this.usuariosService.findOne(id);
  }

  @ApiOperation({
    summary: 'Crear usuario',
    description:
      'Permite a un administrador crear usuarios y asignarles un rol.',
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
  @ApiResponse({ status: 401, description: 'No autenticado.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  @ApiResponse({
    status: 409,
    description: 'Ya existe un usuario con los datos proporcionados.',
  })
  @Post()
  create(
    @Body() dto: CreateUsuarioAdminDto,
  ): Promise<UsuarioResponseDto> {
    return this.usuariosService.createAdmin(dto);
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
  @ApiResponse({ status: 401, description: 'No autenticado.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({
    status: 409,
    description: 'Ya existe un usuario con los datos proporcionados.',
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<UsuarioResponseDto> {
    return this.usuariosService.update(id, updateUsuarioDto);
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
  @ApiResponse({ status: 400, description: 'El ID del usuario no es válido.' })
  @ApiResponse({ status: 401, description: 'No autenticado.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usuariosService.remove(id);
  }
}
