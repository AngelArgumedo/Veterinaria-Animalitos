import { Injectable, Logger } from '@nestjs/common';
import { IngresosService } from '../../ingresos/services/ingresos.service';
import { PropietariosService } from '../../propietarios/services/propietarios.service';
import { MascotasService } from '../../mascotas/services/mascotas.service';
import { EspeciesService } from '../../especies/services/especies.service';
import { SyncPayloadDto } from '../dto/sync-payload.dto';

interface SyncResult {
  localId: string;
  serverId: string;
  entity: string;
  status: 'ok' | 'error';
  error?: string;
}

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);

  constructor(
    private readonly ingresosService: IngresosService,
    private readonly propietariosService: PropietariosService,
    private readonly mascotasService: MascotasService,
    private readonly especiesService: EspeciesService,
  ) {}

  async sync(payload: SyncPayloadDto): Promise<{ results: SyncResult[]; syncedAt: string }> {
    const results: SyncResult[] = [];

    for (const item of payload.propietarios || []) {
      const { localId, ...dto } = item as any;
      try {
        const created = await this.propietariosService.create(dto);
        results.push({ localId, serverId: created.id, entity: 'propietario', status: 'ok' });
      } catch (e) {
        results.push({ localId, serverId: null, entity: 'propietario', status: 'error', error: e.message });
      }
    }

    for (const item of payload.mascotas || []) {
      const { localId, ...dto } = item as any;
      try {
        const created = await this.mascotasService.create(dto);
        results.push({ localId, serverId: created.id, entity: 'mascota', status: 'ok' });
      } catch (e) {
        results.push({ localId, serverId: null, entity: 'mascota', status: 'error', error: e.message });
      }
    }

    for (const item of payload.ingresos || []) {
      const { localId, ...dto } = item as any;
      try {
        const created = await this.ingresosService.create(dto);
        results.push({ localId, serverId: created.id, entity: 'ingreso', status: 'ok' });
      } catch (e) {
        results.push({ localId, serverId: null, entity: 'ingreso', status: 'error', error: e.message });
      }
    }

    for (const item of payload.razasCustom || []) {
      const { localId, especieId, ...dto } = item as any;
      try {
        const created = await this.especiesService.createRazaCustom(especieId, dto);
        results.push({ localId, serverId: created.id, entity: 'raza', status: 'ok' });
      } catch (e) {
        results.push({ localId, serverId: null, entity: 'raza', status: 'error', error: e.message });
      }
    }

    const ok = results.filter((r) => r.status === 'ok').length;
    const errors = results.filter((r) => r.status === 'error').length;
    this.logger.log(`Sync completado: ${ok} ok, ${errors} errores`);

    return { results, syncedAt: new Date().toISOString() };
  }

  async getSeedData() {
    const especiesConRazas = await this.especiesService.findAll();
    return { especies: especiesConRazas, generatedAt: new Date().toISOString() };
  }
}
