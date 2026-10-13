import { Test, TestingModule } from '@nestjs/testing';
import { DespachosService } from './despachos.service';

describe('DespachosService', () => {
  let service: DespachosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DespachosService],
    }).compile();

    service = module.get<DespachosService>(DespachosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
