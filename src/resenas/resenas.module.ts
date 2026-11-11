import { TypeOrmModule } from '@nestjs/typeorm';
import { Resena } from './entities/resena.entity';
import { Module } from '@nestjs/common';
import { ResenasService } from './resenas.service';
import { ResenasController } from './resenas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Resena])],
  controllers: [ResenasController],
  providers: [ResenasService],
})
export class ResenasModule {}
