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
  Req,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';

import { ProveedoresService } from './proveedores.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { ProveedorResponseDto } from './dto/proveedor-response.dto';
import { ImagenResponseDto } from '../archivos/dto/imagen-response.dto';

import { AuthGuard } from '../autenticacion/guards/auth.guard';
import type { AuthenticatedRequest } from '../autenticacion/guards/auth.guard';
import { RolesGuard } from '../autenticacion/guards/roles.guard';
import { Roles } from '../autenticacion/decorators/roles.decorator';
import { RolUsuario } from '../usuarios/enums/rol-usuario.enum';

@ApiTags('Proveedores')
@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @ApiOperation({ summary: 'Obtener proveedores' })
  @ApiResponse({
    status: 200,
    type: ProveedorResponseDto,
    isArray: true,
  })
  @Get()
  findAll(): Promise<ProveedorResponseDto[]> {
    return this.proveedoresService.findAll();
  }

  @ApiOperation({ summary: 'Obtener proveedor por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del proveedor',
    example: 1,
  })
  @ApiResponse({ status: 200, type: ProveedorResponseDto })
  @ApiResponse({
    status: 404,
    description: 'Proveedor no encontrado.',
  })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProveedorResponseDto> {
    return this.proveedoresService.findOne(id);
  }

  @ApiOperation({
    summary: 'Crear proveedor',
    description: 'Solo ADMIN puede registrar proveedores.',
  })
  @ApiResponse({ status: 201, type: ProveedorResponseDto })
  @ApiResponse({ status: 401, description: 'Token inválido.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  @ApiResponse({ status: 409, description: 'Email duplicado.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN)
  @Post()
  create(@Body() dto: CreateProveedorDto): Promise<ProveedorResponseDto> {
    return this.proveedoresService.create(dto);
  }

  @ApiOperation({
    summary: 'Subir imagen de proveedor',
    description: 'ADMIN o proveedor propietario.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del proveedor',
    example: 1,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['archivo'],
      properties: {
        archivo: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 201, type: ImagenResponseDto })
  @ApiResponse({
    status: 400,
    description: 'Archivo inválido.',
  })
  @ApiResponse({ status: 401, description: 'Token inválido.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  @ApiResponse({
    status: 404,
    description: 'Proveedor no encontrado.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN, RolUsuario.PROVEEDOR)
  @UseInterceptors(
    FileInterceptor('archivo', {
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  @Post(':id/imagenes')
  subirImagen(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5 * 1024 * 1024,
          }),
          new FileTypeValidator({
            fileType: /^image\/(jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    archivo: Express.Multer.File,
    @Req() request: AuthenticatedRequest,
  ): Promise<ImagenResponseDto> {
    return this.proveedoresService.subirImagen(id, archivo, request.user!);
  }

  @ApiOperation({
    summary: 'Establecer imagen principal de proveedor',
    description: 'ADMIN o proveedor propietario.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del proveedor',
    example: 1,
  })
  @ApiParam({
    name: 'imagenId',
    type: Number,
    description: 'ID de la imagen asociada al proveedor',
    example: 5,
  })
  @ApiResponse({ status: 200, type: ImagenResponseDto })
  @ApiResponse({ status: 401, description: 'Token inválido.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  @ApiResponse({
    status: 404,
    description: 'Imagen no encontrada.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN, RolUsuario.PROVEEDOR)
  @Patch(':id/imagenes/:imagenId/principal')
  establecerImagenPrincipal(
    @Param('id', ParseIntPipe) id: number,
    @Param('imagenId', ParseIntPipe) imagenId: number,
    @Req() request: AuthenticatedRequest,
  ): Promise<ImagenResponseDto> {
    return this.proveedoresService.establecerImagenPrincipal(
      id,
      imagenId,
      request.user!,
    );
  }

  @ApiOperation({
    summary: 'Eliminar imagen de proveedor',
    description: 'ADMIN o proveedor propietario.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del proveedor',
    example: 1,
  })
  @ApiParam({
    name: 'imagenId',
    type: Number,
    description: 'ID de la imagen asociada al proveedor',
    example: 5,
  })
  @ApiResponse({
    status: 204,
    description: 'Imagen eliminada.',
  })
  @ApiResponse({ status: 401, description: 'Token inválido.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  @ApiResponse({
    status: 404,
    description: 'Imagen no encontrada.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN, RolUsuario.PROVEEDOR)
  @Delete(':id/imagenes/:imagenId')
  @HttpCode(204)
  eliminarImagen(
    @Param('id', ParseIntPipe) id: number,
    @Param('imagenId', ParseIntPipe) imagenId: number,
    @Req() request: AuthenticatedRequest,
  ): Promise<void> {
    return this.proveedoresService.eliminarImagen(id, imagenId, request.user!);
  }

  @ApiOperation({
    summary: 'Actualizar proveedor',
    description: 'ADMIN o proveedor propietario.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del proveedor',
    example: 1,
  })
  @ApiResponse({ status: 200, type: ProveedorResponseDto })
  @ApiResponse({ status: 401, description: 'Token inválido.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  @ApiResponse({
    status: 404,
    description: 'Proveedor no encontrado.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN, RolUsuario.PROVEEDOR)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProveedorDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<ProveedorResponseDto> {
    return this.proveedoresService.update(id, dto, request.user!);
  }

  @ApiOperation({
    summary: 'Eliminar proveedor',
    description: 'Solo ADMIN.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del proveedor',
    example: 1,
  })
  @ApiResponse({
    status: 204,
    description: 'Proveedor eliminado.',
  })
  @ApiResponse({ status: 401, description: 'Token inválido.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  @ApiResponse({
    status: 404,
    description: 'Proveedor no encontrado.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.proveedoresService.remove(id);
  }
}
