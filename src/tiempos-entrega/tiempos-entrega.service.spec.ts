import { Test, TestingModule } from '@nestjs/testing';
import { TiemposEntregaService } from './tiempos-entrega.service';

describe('TiemposEntregaService', () => {
  let service: TiemposEntregaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiemposEntregaService],
    }).compile();

    service = module.get<TiemposEntregaService>(TiemposEntregaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
