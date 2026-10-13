import { Test, TestingModule } from '@nestjs/testing';
import { DatosFacturacionController } from './datos-facturacion.controller';
import { DatosFacturacionService } from './datos-facturacion.service';

describe('DatosFacturacionController', () => {
  let controller: DatosFacturacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatosFacturacionController],
      providers: [DatosFacturacionService],
    }).compile();

    controller = module.get<DatosFacturacionController>(DatosFacturacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
