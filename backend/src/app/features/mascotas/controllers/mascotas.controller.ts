import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { MascotasService } from '../services/mascotas.service';
import { CreateMascotaDto } from '../dto/create-mascota.dto';
import { UpdateMascotaDto } from '../dto/update-mascota.dto';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Get()
  findAll() {
    return this.mascotasService.findAll();
  }

  @Get('buscar')
  buscar(@Query('q') q: string) {
    return this.mascotasService.buscar(q || '');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mascotasService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateMascotaDto) {
    return this.mascotasService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMascotaDto) {
    return this.mascotasService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mascotasService.remove(id);
  }
}
