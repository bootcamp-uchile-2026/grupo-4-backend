import { Test, TestingModule } from '@nestjs/testing';
import { DespachosController } from './despachos.controller';
import { DespachosService } from './despachos.service';

describe('DespachosController', () => {
  let controller: DespachosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DespachosController],
      providers: [DespachosService],
    }).compile();

    controller = module.get<DespachosController>(DespachosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
