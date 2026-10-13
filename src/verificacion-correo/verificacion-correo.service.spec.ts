import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from '../usuarios/usuarios.service';
import { VerificacionCorreoService } from './verificacion-correo.service';

describe('VerificacionCorreoService', () => {
  let service: VerificacionCorreoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerificacionCorreoService, UsuariosService],
    }).compile();

    service = module.get<VerificacionCorreoService>(VerificacionCorreoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
