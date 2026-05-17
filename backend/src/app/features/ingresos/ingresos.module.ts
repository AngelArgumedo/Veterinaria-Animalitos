import { Module } from '@nestjs/common';
import { IngresosController } from './controllers/ingresos.controller';
import { IngresosService } from './services/ingresos.service';

@Module({
  controllers: [IngresosController],
  providers: [IngresosService],
  exports: [IngresosService],
})
export class IngresosModule {}
