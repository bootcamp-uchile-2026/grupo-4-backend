import { Module } from '@nestjs/common';
import { MetodosEntregaService } from './metodos-entrega.service';
import { MetodosEntregaController } from './metodos-entrega.controller';

@Module({
  controllers: [MetodosEntregaController],
  providers: [MetodosEntregaService],
})
export class MetodosEntregaModule {}
