import { db } from '../../../core/services/db.service';
import type { IngresoFormData, Ingreso } from '../models/ingreso.model';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1';

export async function crearIngreso(data: IngresoFormData): Promise<Ingreso> {
  const ahora = new Date().toISOString();

  const ingreso: Ingreso = {
    ...data,
    id: crypto.randomUUID(),
    fecha: ahora.split('T')[0],
    synced: false,
    createdAt: ahora,
    updatedAt: ahora,
  };

  // 1. Guardar en IndexedDB siempre — funciona offline
  await db.ingresos.add(ingreso);

  // 2. Si hay conexión, intentar enviar al backend inmediatamente
  if (navigator.onLine) {
    try {
      const res = await fetch(`${API_BASE}/ingresos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ingreso),
      });

      if (res.ok) {
        await db.ingresos.update(ingreso.id, { synced: true });
        ingreso.synced = true;
      }
    } catch {
      // Red disponible pero fallo — el sync worker lo reintentará
    }
  }

  return ingreso;
}

export async function listarIngresos(): Promise<Ingreso[]> {
  return db.ingresos.orderBy('createdAt').reverse().toArray();
}
