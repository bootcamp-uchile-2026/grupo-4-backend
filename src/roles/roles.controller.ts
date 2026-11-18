import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RolesService } from './roles.service';
import { AuthGuard } from '../autenticacion/guards/auth.guard';
import { RolesGuard } from '../autenticacion/guards/roles.guard';
import { Roles } from '../autenticacion/decorators/roles.decorator';
import { RolUsuario } from '../usuarios/enums/rol-usuario.enum';
import { Rol } from './entities/rol.entity';

const rolSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 2,
      description: 'Identificador del rol',
    },
    nombre: {
      type: 'string',
      enum: Object.values(RolUsuario),
      example: RolUsuario.ADMIN,
      description: 'Nombre del rol',
    },
  },
};

@ApiTags('Roles')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(RolUsuario.ADMIN)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los roles',
    description:
      'Lista los roles disponibles. Requiere permisos de administrador.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de roles obtenida correctamente.',
    schema: {
      type: 'array',
      items: rolSchema,
      example: [
        { id: 1, nombre: 'CLIENTE' },
        { id: 2, nombre: 'ADMIN' },
        { id: 3, nombre: 'PROVEEDOR' },
      ],
    },
  })
  @ApiResponse({ status: 401, description: 'No autenticado.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  findAll(): Promise<Rol[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener rol por ID',
    description:
      'Consulta un rol específico. Requiere permisos de administrador.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 2,
    description: 'Identificador del rol',
  })
  @ApiResponse({
    status: 200,
    description: 'Rol obtenido correctamente.',
    schema: rolSchema,
  })
  @ApiResponse({ status: 400, description: 'ID inválido.' })
  @ApiResponse({ status: 401, description: 'No autenticado.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Rol> {
    return this.rolesService.findOne(id);
  }
}
