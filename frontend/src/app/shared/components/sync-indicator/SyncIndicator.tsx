interface SyncIndicatorProps {
  isOnline: boolean;
  pendingCount: number;
}

export function SyncIndicator({ isOnline, pendingCount }: SyncIndicatorProps) {
  const hasPending = pendingCount > 0;

  let status: 'online' | 'syncing' | 'offline';
  let label: string;

  if (!isOnline) {
    status = 'offline';
    label = hasPending ? `Sin conexión · ${pendingCount} pendiente${pendingCount > 1 ? 's' : ''}` : 'Sin conexión';
  } else if (hasPending) {
    status = 'syncing';
    label = `Sincronizando ${pendingCount}…`;
  } else {
    status = 'online';
    label = 'Sincronizado';
  }

  return (
    <div className={`sync-indicator sync-indicator--${status}`}>
      <span className="sync-indicator__dot" />
      <span className="sync-indicator__label">{label}</span>
    </div>
  );
}
