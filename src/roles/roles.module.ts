import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Rol } from './entities/rol.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { AutenticacionModule } from '../autenticacion/autenticacion.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rol]), AutenticacionModule],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
