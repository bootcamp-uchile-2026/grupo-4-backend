import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from '../usuarios/usuarios.service';
import { VerificacionCorreoController } from './verificacion-correo.controller';
import { VerificacionCorreoService } from './verificacion-correo.service';

describe('VerificacionCorreoController', () => {
  let controller: VerificacionCorreoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerificacionCorreoController],
      providers: [VerificacionCorreoService, UsuariosService],
    }).compile();

    controller = module.get<VerificacionCorreoController>(
      VerificacionCorreoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
