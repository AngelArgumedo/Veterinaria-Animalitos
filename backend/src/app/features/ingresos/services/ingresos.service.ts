import { Injectable, NotFoundException } from '@nestjs/common';
import { eq, desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../../../shared/database/database.service';
import { ingresos } from '../../../shared/database/schema';
import { CreateIngresoDto } from '../dto/create-ingreso.dto';

@Injectable()
export class IngresosService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    return this.db.db.select().from(ingresos).orderBy(desc(ingresos.createdAt));
  }

  async findOne(id: string) {
    const result = await this.db.db.select().from(ingresos).where(eq(ingresos.id, id)).get();
    if (!result) throw new NotFoundException(`Ingreso ${id} no encontrado`);
    return result;
  }

  async findByFecha(fecha: string) {
    return this.db.db
      .select()
      .from(ingresos)
      .where(eq(ingresos.fecha, fecha))
      .orderBy(desc(ingresos.createdAt));
  }

  async create(dto: CreateIngresoDto) {
    const now = new Date().toISOString();
    const id = uuidv4();

    await this.db.db.insert(ingresos).values({
      id,
      ...dto,
      fecha: dto.fecha || now.split('T')[0],
      castradoEsterilizado: dto.castradoEsterilizado ?? false,
      synced: true,
      createdAt: now,
      updatedAt: now,
    });

    return this.findOne(id);
  }

  async update(id: string, dto: Partial<CreateIngresoDto>) {
    await this.findOne(id);
    await this.db.db
      .update(ingresos)
      .set({ ...dto, updatedAt: new Date().toISOString() })
      .where(eq(ingresos.id, id));
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.db.db.delete(ingresos).where(eq(ingresos.id, id));
    return { message: 'Ingreso eliminado' };
  }
}
