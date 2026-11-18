import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { Categoria } from './entities/categoria.entity';
import { AutenticacionModule } from '../autenticacion/autenticacion.module';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria]), AutenticacionModule],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}
