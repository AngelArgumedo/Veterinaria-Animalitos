import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './app/shared/database/database.module';
import { PropietariosModule } from './app/features/propietarios/propietarios.module';
import { MascotasModule } from './app/features/mascotas/mascotas.module';
import { IngresosModule } from './app/features/ingresos/ingresos.module';
import { EspeciesModule } from './app/features/especies/especies.module';
import { SyncModule } from './app/features/sync/sync.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    EspeciesModule,
    PropietariosModule,
    MascotasModule,
    IngresosModule,
    SyncModule,
  ],
})
export class AppModule {}
