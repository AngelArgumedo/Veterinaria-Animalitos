import { Controller, Post, Get, Body } from '@nestjs/common';
import { SyncService } from '../services/sync.service';
import { SyncPayloadDto } from '../dto/sync-payload.dto';

@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post()
  sync(@Body() payload: SyncPayloadDto) {
    return this.syncService.sync(payload);
  }

  @Get('seed')
  getSeedData() {
    return this.syncService.getSeedData();
  }
}
