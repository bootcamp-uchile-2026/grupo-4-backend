import { Test, TestingModule } from '@nestjs/testing';
import { MetodosEntregaService } from './metodos-entrega.service';

describe('MetodosEntregaService', () => {
  let service: MetodosEntregaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetodosEntregaService],
    }).compile();

    service = module.get<MetodosEntregaService>(MetodosEntregaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
