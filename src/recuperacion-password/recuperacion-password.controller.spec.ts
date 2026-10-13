import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from '../usuarios/usuarios.service';
import { RecuperacionPasswordController } from './recuperacion-password.controller';
import { RecuperacionPasswordService } from './recuperacion-password.service';

describe('RecuperacionPasswordController', () => {
  let controller: RecuperacionPasswordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecuperacionPasswordController],
      providers: [RecuperacionPasswordService, UsuariosService],
    }).compile();

    controller = module.get<RecuperacionPasswordController>(
      RecuperacionPasswordController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
