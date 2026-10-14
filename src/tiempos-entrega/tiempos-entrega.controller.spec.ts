import { Test, TestingModule } from '@nestjs/testing';
import { TiemposEntregaController } from './tiempos-entrega.controller';
import { TiemposEntregaService } from './tiempos-entrega.service';

describe('TiemposEntregaController', () => {
  let controller: TiemposEntregaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiemposEntregaController],
      providers: [TiemposEntregaService],
    }).compile();

    controller = module.get<TiemposEntregaController>(TiemposEntregaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
