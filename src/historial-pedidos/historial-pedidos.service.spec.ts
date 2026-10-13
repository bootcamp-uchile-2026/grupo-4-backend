import { Test, TestingModule } from '@nestjs/testing';
import { HistorialPedidosService } from './historial-pedidos.service';

describe('HistorialPedidosService', () => {
  let service: HistorialPedidosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistorialPedidosService],
    }).compile();

    service = module.get<HistorialPedidosService>(HistorialPedidosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
