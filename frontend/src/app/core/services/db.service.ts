import Dexie, { type Table } from 'dexie';
import type { Ingreso } from '../../features/ingresos/models/ingreso.model';

class VeterinariaDB extends Dexie {
  ingresos!: Table<Ingreso, string>;

  constructor() {
    super('veterinaria-animalitos');
    this.version(1).stores({
      // id = clave primaria, synced e createdAt indexados para queries
      ingresos: 'id, synced, createdAt',
    });
  }
}

export const db = new VeterinariaDB();
