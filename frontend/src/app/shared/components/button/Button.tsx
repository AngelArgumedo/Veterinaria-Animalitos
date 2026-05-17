import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({
  children,
  type = 'button',
  variant = 'primary',
  loading = false,
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn btn--${variant}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <>
          <span className="btn__spinner" aria-hidden="true" />
          Guardando…
        </>
      ) : (
        <>
          {children}
          {variant === 'primary' && <span aria-hidden="true">→</span>}
        </>
      )}
    </button>
  );
}
