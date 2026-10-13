import { Test, TestingModule } from '@nestjs/testing';
import { SeguimientosDespachoController } from './seguimientos-despacho.controller';
import { SeguimientosDespachoService } from './seguimientos-despacho.service';

describe('SeguimientosDespachoController', () => {
  let controller: SeguimientosDespachoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeguimientosDespachoController],
      providers: [SeguimientosDespachoService],
    }).compile();

    controller = module.get<SeguimientosDespachoController>(
      SeguimientosDespachoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
