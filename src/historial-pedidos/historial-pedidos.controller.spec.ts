import { Test, TestingModule } from '@nestjs/testing';
import { HistorialPedidosController } from './historial-pedidos.controller';
import { HistorialPedidosService } from './historial-pedidos.service';

describe('HistorialPedidosController', () => {
  let controller: HistorialPedidosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorialPedidosController],
      providers: [HistorialPedidosService],
    }).compile();

    controller = module.get<HistorialPedidosController>(HistorialPedidosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
