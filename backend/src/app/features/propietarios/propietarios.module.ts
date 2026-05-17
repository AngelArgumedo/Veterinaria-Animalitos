import { Module } from '@nestjs/common';
import { PropietariosController } from './controllers/propietarios.controller';
import { PropietariosService } from './services/propietarios.service';

@Module({
  controllers: [PropietariosController],
  providers: [PropietariosService],
  exports: [PropietariosService],
})
export class PropietariosModule {}
