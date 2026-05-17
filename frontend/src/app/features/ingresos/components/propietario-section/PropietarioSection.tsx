import { TextInput } from '../../../../shared/components/text-input/TextInput';
import type { IngresoFormData } from '../../models/ingreso.model';

interface PropietarioSectionProps {
  data: Pick<
    IngresoFormData,
    'propietarioNombre' | 'propietarioDocumento' | 'propietarioTelefono' | 'propietarioEmail'
  >;
  onChange: <K extends keyof IngresoFormData>(field: K, value: IngresoFormData[K]) => void;
}

export function PropietarioSection({ data, onChange }: PropietarioSectionProps) {
  return (
    <section className="form-section">
      <div className="form-section__header">
        <span className="form-section__icon" aria-hidden="true">👤</span>
        <h2 className="form-section__title">Propietario</h2>
      </div>

      <TextInput
        label="Nombre completo"
        value={data.propietarioNombre}
        placeholder="Nombres y apellidos"
        onChange={(v) => onChange('propietarioNombre', v)}
        required
      />

      <TextInput
        label="Documento"
        value={data.propietarioDocumento}
        placeholder="CC / NIT / Pasaporte"
        onChange={(v) => onChange('propietarioDocumento', v)}
        required
      />

      <TextInput
        label="Teléfono"
        value={data.propietarioTelefono}
        placeholder="300 000 0000"
        onChange={(v) => onChange('propietarioTelefono', v)}
        required
      />

      <TextInput
        label="Email"
        value={data.propietarioEmail}
        placeholder="correo@ejemplo.com"
        onChange={(v) => onChange('propietarioEmail', v)}
        optional
      />
    </section>
  );
}
