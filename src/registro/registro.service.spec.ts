import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from '../usuarios/usuarios.service';
import { RegistroService } from './registro.service';

describe('RegistroService', () => {
  let service: RegistroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistroService, UsuariosService],
    }).compile();

    service = module.get<RegistroService>(RegistroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
