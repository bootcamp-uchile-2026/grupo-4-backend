import { Test, TestingModule } from '@nestjs/testing';
import { DatosDespachoController } from './datos-despacho.controller';
import { DatosDespachoService } from './datos-despacho.service';

describe('DatosDespachoController', () => {
  let controller: DatosDespachoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatosDespachoController],
      providers: [DatosDespachoService],
    }).compile();

    controller = module.get<DatosDespachoController>(DatosDespachoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
