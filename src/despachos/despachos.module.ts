import { TypeOrmModule } from '@nestjs/typeorm';
import { Despacho } from './entities/despacho.entity';
import { Module } from '@nestjs/common';
import { DespachosController } from './despachos.controller';
import { DespachosService } from './despachos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Despacho])],
  controllers: [DespachosController],
  providers: [DespachosService],
})
export class DespachosModule {}
