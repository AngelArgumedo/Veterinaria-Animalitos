import { useEffect, useState, useCallback } from 'react';
import { syncPendientes, contarPendientes } from '../services/sync.service';
import { useOnlineStatus } from './useOnlineStatus';

const SYNC_INTERVAL_MS = 30_000;

export function useSync(): { pendingCount: number } {
  const isOnline = useOnlineStatus();
  const [pendingCount, setPendingCount] = useState(0);

  const refreshCount = useCallback(async () => {
    const count = await contarPendientes();
    setPendingCount(count);
  }, []);

  const runSync = useCallback(async () => {
    await syncPendientes();
    await refreshCount();
  }, [refreshCount]);

  // Contador inicial al montar
  useEffect(() => {
    refreshCount();
  }, [refreshCount]);

  // Refresca el contador cuando se guarda un nuevo ingreso
  useEffect(() => {
    window.addEventListener('ingreso-guardado', refreshCount);
    return () => window.removeEventListener('ingreso-guardado', refreshCount);
  }, [refreshCount]);

  // Sync automático cada 30s cuando hay conexión
  useEffect(() => {
    if (!isOnline) return;

    runSync();
    const interval = setInterval(runSync, SYNC_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isOnline, runSync]);

  return { pendingCount };
}
