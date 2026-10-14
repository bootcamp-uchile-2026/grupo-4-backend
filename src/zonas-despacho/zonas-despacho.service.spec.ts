import { Test, TestingModule } from '@nestjs/testing';
import { ZonasDespachoService } from './zonas-despacho.service';

describe('ZonasDespachoService', () => {
  let service: ZonasDespachoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZonasDespachoService],
    }).compile();

    service = module.get<ZonasDespachoService>(ZonasDespachoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
