import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmacionCompraController } from './confirmacion-compra.controller';
import { ConfirmacionCompraService } from './confirmacion-compra.service';

describe('ConfirmacionCompraController', () => {
  let controller: ConfirmacionCompraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfirmacionCompraController],
      providers: [ConfirmacionCompraService],
    }).compile();

    controller = module.get<ConfirmacionCompraController>(ConfirmacionCompraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
