interface NumberInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit?: string;
  prefix?: string;
  placeholder?: string;
  min?: number;
  step?: number;
}

export function NumberInput({
  label,
  value,
  onChange,
  unit,
  prefix,
  placeholder,
  min,
  step,
}: NumberInputProps) {
  return (
    <div className="number-input">
      <label className="number-input__label">{label}</label>
      <div className="number-input__wrapper">
        {prefix && <span className="number-input__prefix">{prefix}</span>}
        <input
          type="number"
          className={[
            'number-input__field',
            prefix ? 'number-input__field--has-prefix' : '',
            unit   ? 'number-input__field--has-unit'   : '',
          ].join(' ')}
          value={value}
          placeholder={placeholder ?? ''}
          min={min}
          step={step}
          onChange={(e) => onChange(e.target.value)}
        />
        {unit && <span className="number-input__unit">{unit}</span>}
      </div>
    </div>
  );
}
