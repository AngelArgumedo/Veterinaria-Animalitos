import { Injectable, NotFoundException } from '@nestjs/common';
import { eq, like, desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../../../shared/database/database.service';
import { mascotas } from '../../../shared/database/schema';
import { CreateMascotaDto } from '../dto/create-mascota.dto';
import { UpdateMascotaDto } from '../dto/update-mascota.dto';

@Injectable()
export class MascotasService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    return this.db.db.select().from(mascotas).orderBy(desc(mascotas.createdAt));
  }

  async findOne(id: string) {
    const result = await this.db.db.select().from(mascotas).where(eq(mascotas.id, id)).get();
    if (!result) throw new NotFoundException(`Mascota ${id} no encontrada`);
    return result;
  }

  async buscar(q: string) {
    return this.db.db
      .select()
      .from(mascotas)
      .where(like(mascotas.nombre, `%${q}%`))
      .limit(20);
  }

  async create(dto: CreateMascotaDto) {
    const now = new Date().toISOString();
    const id = uuidv4();

    const noHistoria = dto.noHistoria || await this.generarNoHistoria();

    await this.db.db.insert(mascotas).values({
      id,
      ...dto,
      noHistoria,
      genero: dto.genero || 'MACHO',
      temperamento: dto.temperamento || 'SOCIAL',
      synced: true,
      createdAt: now,
      updatedAt: now,
    });

    return this.findOne(id);
  }

  async update(id: string, dto: UpdateMascotaDto) {
    await this.findOne(id);
    await this.db.db
      .update(mascotas)
      .set({ ...dto, updatedAt: new Date().toISOString() })
      .where(eq(mascotas.id, id));
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.db.db.delete(mascotas).where(eq(mascotas.id, id));
    return { message: 'Mascota eliminada' };
  }

  private async generarNoHistoria(): Promise<string> {
    const total = await this.db.db.select().from(mascotas);
    return String(total.length + 1).padStart(4, '0');
  }
}
