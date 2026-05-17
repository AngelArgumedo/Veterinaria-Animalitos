import { Module } from '@nestjs/common';
import { SyncController } from './controllers/sync.controller';
import { SyncService } from './services/sync.service';
import { IngresosModule } from '../ingresos/ingresos.module';
import { PropietariosModule } from '../propietarios/propietarios.module';
import { MascotasModule } from '../mascotas/mascotas.module';
import { EspeciesModule } from '../especies/especies.module';

@Module({
  imports: [IngresosModule, PropietariosModule, MascotasModule, EspeciesModule],
  controllers: [SyncController],
  providers: [SyncService],
})
export class SyncModule {}
