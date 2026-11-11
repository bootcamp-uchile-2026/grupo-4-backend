import { TypeOrmModule } from '@nestjs/typeorm';
import { MetodosEntrega } from './entities/metodos-entrega.entity';
import { Module } from '@nestjs/common';
import { MetodosEntregaService } from './metodos-entrega.service';
import { MetodosEntregaController } from './metodos-entrega.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MetodosEntrega])],
  controllers: [MetodosEntregaController],
  providers: [MetodosEntregaService],
})
export class MetodosEntregaModule {}
