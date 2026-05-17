import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { EspeciesService } from '../services/especies.service';
import { CreateRazaDto } from '../dto/create-raza.dto';

@Controller('especies')
export class EspeciesController {
  constructor(private readonly especiesService: EspeciesService) {}

  @Get()
  findAll() {
    return this.especiesService.findAll();
  }

  @Get(':id/razas')
  findRazas(@Param('id') id: string) {
    return this.especiesService.findRazasByEspecie(id);
  }

  @Post(':id/razas')
  createRaza(@Param('id') id: string, @Body() dto: CreateRazaDto) {
    return this.especiesService.createRazaCustom(id, dto);
  }
}
