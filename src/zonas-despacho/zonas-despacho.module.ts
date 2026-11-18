import { TypeOrmModule } from '@nestjs/typeorm';
import { ZonaDespacho } from './entities/zona-despacho.entity';
import { Module } from '@nestjs/common';
import { ZonasDespachoController } from './zonas-despacho.controller';
import { ZonasDespachoService } from './zonas-despacho.service';

@Module({
  imports: [TypeOrmModule.forFeature([ZonaDespacho])],
  controllers: [ZonasDespachoController],
  providers: [ZonasDespachoService],
})
export class ZonasDespachoModule {}
