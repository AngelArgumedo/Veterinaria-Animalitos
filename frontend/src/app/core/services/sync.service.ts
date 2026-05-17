import { db } from './db.service';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1';

export async function syncPendientes(): Promise<void> {
  const pendientes = await db.ingresos.filter((i) => !i.synced).toArray();

  if (pendientes.length === 0) return;

  for (const ingreso of pendientes) {
    try {
      const res = await fetch(`${API_BASE}/ingresos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ingreso),
      });

      if (res.ok) {
        await db.ingresos.update(ingreso.id, { synced: true });
      }
    } catch {
      // Sin conexión o error de red — reintenta en el próximo ciclo (30s)
    }
  }
}

export async function contarPendientes(): Promise<number> {
  return db.ingresos.filter((i) => !i.synced).count();
}
