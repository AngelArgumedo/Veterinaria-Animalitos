import type { ReactNode } from 'react';
import { SyncIndicator } from '../../shared/components/sync-indicator/SyncIndicator';
import { useSync } from '../../core/hooks/useSync';
import { useOnlineStatus } from '../../core/hooks/useOnlineStatus';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const isOnline = useOnlineStatus();
  const { pendingCount } = useSync();

  return (
    <div className="layout">
      <nav className="layout__nav">
        <span className="layout__brand">
          <span className="layout__brand-icon" aria-hidden="true">🐾</span>
          Animalitos
        </span>
        <SyncIndicator isOnline={isOnline} pendingCount={pendingCount} />
      </nav>

      <div className="layout__content">
        {children}
      </div>
    </div>
  );
}
