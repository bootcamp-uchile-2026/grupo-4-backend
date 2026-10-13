import { PartialType } from '@nestjs/swagger';
import { CreateItemsCarritoDto } from './create-items-carrito.dto';

export class UpdateItemsCarritoDto extends PartialType(CreateItemsCarritoDto) {}
