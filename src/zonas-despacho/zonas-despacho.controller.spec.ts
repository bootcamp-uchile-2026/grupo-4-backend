import { Test, TestingModule } from '@nestjs/testing';
import { ZonasDespachoController } from './zonas-despacho.controller';
import { ZonasDespachoService } from './zonas-despacho.service';

describe('ZonasDespachoController', () => {
  let controller: ZonasDespachoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZonasDespachoController],
      providers: [ZonasDespachoService],
    }).compile();

    controller = module.get<ZonasDespachoController>(ZonasDespachoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
