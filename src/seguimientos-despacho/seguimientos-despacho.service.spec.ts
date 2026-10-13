import { Test, TestingModule } from '@nestjs/testing';
import { SeguimientosDespachoService } from './seguimientos-despacho.service';

describe('SeguimientosDespachoService', () => {
  let service: SeguimientosDespachoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeguimientosDespachoService],
    }).compile();

    service = module.get<SeguimientosDespachoService>(
      SeguimientosDespachoService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
