import { Test, TestingModule } from '@nestjs/testing';
import { ItemsCarritoService } from './items-carrito.service';

describe('ItemsCarritoService', () => {
  let service: ItemsCarritoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsCarritoService],
    }).compile();

    service = module.get<ItemsCarritoService>(ItemsCarritoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
