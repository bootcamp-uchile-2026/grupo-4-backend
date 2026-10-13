import { Test, TestingModule } from '@nestjs/testing';
import { DatosFacturacionService } from './datos-facturacion.service';

describe('DatosFacturacionService', () => {
  let service: DatosFacturacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatosFacturacionService],
    }).compile();

    service = module.get<DatosFacturacionService>(DatosFacturacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
