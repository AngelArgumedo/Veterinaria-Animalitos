import type { ReactNode } from 'react';

interface ChipOption<T extends string> {
  value: T;
  label: ReactNode;
}

interface ChipGroupProps<T extends string> {
  options: ChipOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
}

export function ChipGroup<T extends string>({
  options,
  value,
  onChange,
  label,
}: ChipGroupProps<T>) {
  return (
    <div className="chip-group">
      {label && <span className="chip-group__label">{label}</span>}
      <div className="chip-group__options">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`chip ${value === opt.value ? 'chip--active' : ''}`}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
