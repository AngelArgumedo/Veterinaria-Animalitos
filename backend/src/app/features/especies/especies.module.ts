import { Module } from '@nestjs/common';
import { EspeciesController } from './controllers/especies.controller';
import { EspeciesService } from './services/especies.service';

@Module({
  controllers: [EspeciesController],
  providers: [EspeciesService],
  exports: [EspeciesService],
})
export class EspeciesModule {}
