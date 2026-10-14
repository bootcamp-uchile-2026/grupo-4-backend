import { Test, TestingModule } from '@nestjs/testing';
import { MetodosEntregaController } from './metodos-entrega.controller';
import { MetodosEntregaService } from './metodos-entrega.service';

describe('MetodosEntregaController', () => {
  let controller: MetodosEntregaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetodosEntregaController],
      providers: [MetodosEntregaService],
    }).compile();

    controller = module.get<MetodosEntregaController>(MetodosEntregaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
