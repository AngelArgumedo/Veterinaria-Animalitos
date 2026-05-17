import { Injectable, OnModuleInit, Logger, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../../../shared/database/database.service';
import { especies, razas } from '../../../shared/database/schema';
import { ESPECIES_SEED, RAZAS_SEED } from '../data/razas-seed';
import { CreateRazaDto } from '../dto/create-raza.dto';

@Injectable()
export class EspeciesService implements OnModuleInit {
  private readonly logger = new Logger(EspeciesService.name);

  constructor(private readonly db: DatabaseService) {}

  async onModuleInit() {
    await this.seedIfEmpty();
  }

  private async seedIfEmpty() {
    const existing = await this.db.db.select().from(especies).limit(1);
    if (existing.length > 0) return;

    this.logger.log('Cargando seed de especies y razas...');

    for (const especie of ESPECIES_SEED) {
      await this.db.db.insert(especies).values(especie).onConflictDoNothing();
    }

    for (const raza of RAZAS_SEED) {
      await this.db.db.insert(razas).values({ ...raza, isCustom: false, synced: true }).onConflictDoNothing();
    }

    this.logger.log(`Seed cargado: ${ESPECIES_SEED.length} especies, ${RAZAS_SEED.length} razas`);
  }

  async findAll() {
    const todasEspecies = await this.db.db.select().from(especies);
    const todasRazas = await this.db.db.select().from(razas);

    return todasEspecies.map((esp) => ({
      ...esp,
      razas: todasRazas.filter((r) => r.especieId === esp.id),
    }));
  }

  async findRazasByEspecie(especieId: string) {
    const especie = await this.db.db.select().from(especies).where(eq(especies.id, especieId)).get();
    if (!especie) throw new NotFoundException(`Especie ${especieId} no encontrada`);

    return this.db.db.select().from(razas).where(eq(razas.especieId, especieId));
  }

  async createRazaCustom(especieId: string, dto: CreateRazaDto) {
    const especie = await this.db.db.select().from(especies).where(eq(especies.id, especieId)).get();
    if (!especie) throw new NotFoundException(`Especie ${especieId} no encontrada`);

    const id = `${especieId}-custom-${uuidv4().slice(0, 8)}`;
    const nombre = dto.nombre.trim().toUpperCase();

    await this.db.db.insert(razas).values({ id, especieId, nombre, isCustom: true, synced: true });
    return { id, especieId, nombre, isCustom: true };
  }
}
