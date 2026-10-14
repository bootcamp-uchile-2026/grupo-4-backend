import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmacionCompraService } from './confirmacion-compra.service';

describe('ConfirmacionCompraService', () => {
  let service: ConfirmacionCompraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfirmacionCompraService],
    }).compile();

    service = module.get<ConfirmacionCompraService>(ConfirmacionCompraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
