import { Module } from '@nestjs/common';
import { ConfirmacionCompraService } from './confirmacion-compra.service';
import { ConfirmacionCompraController } from './confirmacion-compra.controller';

@Module({
  controllers: [ConfirmacionCompraController],
  providers: [ConfirmacionCompraService],
})
export class ConfirmacionCompraModule {}
