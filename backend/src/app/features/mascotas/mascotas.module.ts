import { Module } from '@nestjs/common';
import { MascotasController } from './controllers/mascotas.controller';
import { MascotasService } from './services/mascotas.service';

@Module({
  controllers: [MascotasController],
  providers: [MascotasService],
  exports: [MascotasService],
})
export class MascotasModule {}
