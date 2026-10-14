import { Test, TestingModule } from '@nestjs/testing';
import { DatosDespachoService } from './datos-despacho.service';

describe('DatosDespachoService', () => {
  let service: DatosDespachoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatosDespachoService],
    }).compile();

    service = module.get<DatosDespachoService>(DatosDespachoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
