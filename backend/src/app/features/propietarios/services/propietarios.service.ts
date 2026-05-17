import { Injectable, NotFoundException } from '@nestjs/common';
import { eq, like, or } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../../../shared/database/database.service';
import { propietarios } from '../../../shared/database/schema';
import { CreatePropietarioDto } from '../dto/create-propietario.dto';
import { UpdatePropietarioDto } from '../dto/update-propietario.dto';

@Injectable()
export class PropietariosService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    return this.db.db.select().from(propietarios);
  }

  async findOne(id: string) {
    const result = await this.db.db.select().from(propietarios).where(eq(propietarios.id, id)).get();
    if (!result) throw new NotFoundException(`Propietario ${id} no encontrado`);
    return result;
  }

  async buscar(q: string) {
    const term = `%${q}%`;
    return this.db.db
      .select()
      .from(propietarios)
      .where(
        or(
          like(propietarios.nombres, term),
          like(propietarios.apellidos, term),
          like(propietarios.documento, term),
          like(propietarios.telefono, term),
        ),
      )
      .limit(20);
  }

  async create(dto: CreatePropietarioDto) {
    const now = new Date().toISOString();
    const id = uuidv4();

    await this.db.db.insert(propietarios).values({
      id,
      ...dto,
      ciudad: dto.ciudad || 'CALI',
      aceptaWhatsapp: dto.aceptaWhatsapp ?? false,
      aceptaEmail: dto.aceptaEmail ?? false,
      synced: true,
      createdAt: now,
      updatedAt: now,
    });

    return this.findOne(id);
  }

  async update(id: string, dto: UpdatePropietarioDto) {
    await this.findOne(id);
    await this.db.db
      .update(propietarios)
      .set({ ...dto, updatedAt: new Date().toISOString() })
      .where(eq(propietarios.id, id));
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.db.db.delete(propietarios).where(eq(propietarios.id, id));
    return { message: 'Propietario eliminado' };
  }
}
