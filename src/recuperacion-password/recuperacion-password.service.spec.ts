import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from '../usuarios/usuarios.service';
import { RecuperacionPasswordService } from './recuperacion-password.service';

describe('RecuperacionPasswordService', () => {
  let service: RecuperacionPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecuperacionPasswordService, UsuariosService],
    }).compile();

    service = module.get<RecuperacionPasswordService>(
      RecuperacionPasswordService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
