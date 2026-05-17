import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { IngresosService } from '../services/ingresos.service';
import { CreateIngresoDto } from '../dto/create-ingreso.dto';

@Controller('ingresos')
export class IngresosController {
  constructor(private readonly ingresosService: IngresosService) {}

  @Get()
  findAll(@Query('fecha') fecha?: string) {
    if (fecha) return this.ingresosService.findByFecha(fecha);
    return this.ingresosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingresosService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateIngresoDto) {
    return this.ingresosService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateIngresoDto>) {
    return this.ingresosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingresosService.remove(id);
  }
}
