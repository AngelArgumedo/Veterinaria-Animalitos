interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
}

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  required,
  optional,
}: TextInputProps) {
  return (
    <div className="text-input">
      <label className="text-input__label">
        {label}
        {optional && <span className="text-input__optional"> (opcional)</span>}
      </label>
      <input
        type="text"
        className="text-input__field"
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
