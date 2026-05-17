import { ChipGroup } from '../../../../shared/components/chip-group/ChipGroup';
import { Toggle } from '../../../../shared/components/toggle/Toggle';
import { TextInput } from '../../../../shared/components/text-input/TextInput';
import { NumberInput } from '../../../../shared/components/number-input/NumberInput';
import type { Especie, Genero, IngresoFormData } from '../../models/ingreso.model';

const ESPECIES: { value: Especie; label: string }[] = [
  { value: 'canino', label: '🐕 Canino' },
  { value: 'felino', label: '🐈 Felino' },
  { value: 'otro',   label: '🐾 Otro' },
];

const GENEROS: { value: Genero; label: string }[] = [
  { value: 'MACHO',  label: '♂ Macho' },
  { value: 'HEMBRA', label: '♀ Hembra' },
];

interface PacienteSectionProps {
  data: Pick<
    IngresoFormData,
    | 'mascotaNombre'
    | 'especieId'
    | 'genero'
    | 'castradoEsterilizado'
    | 'edad'
    | 'peso'
    | 'temperatura'
    | 'motivoConsulta'
  >;
  onChange: <K extends keyof IngresoFormData>(field: K, value: IngresoFormData[K]) => void;
}

export function PacienteSection({ data, onChange }: PacienteSectionProps) {
  return (
    <section className="form-section">
      <div className="form-section__header">
        <span className="form-section__icon" aria-hidden="true">🐾</span>
        <h2 className="form-section__title">Paciente</h2>
      </div>

      <TextInput
        label="Nombre de la mascota"
        value={data.mascotaNombre}
        placeholder="Ej: Firulais"
        onChange={(v) => onChange('mascotaNombre', v)}
        required
      />

      <ChipGroup
        label="Especie"
        options={ESPECIES}
        value={data.especieId}
        onChange={(v) => onChange('especieId', v)}
      />

      <ChipGroup
        label="Género"
        options={GENEROS}
        value={data.genero}
        onChange={(v) => onChange('genero', v)}
      />

      <Toggle
        label="Castrado / Esterilizado"
        checked={data.castradoEsterilizado}
        onChange={(v) => onChange('castradoEsterilizado', v)}
      />

      <div className="form-row">
        <NumberInput
          label="Edad"
          value={data.edad}
          onChange={(v) => onChange('edad', v)}
          placeholder="0"
          unit="años"
          min={0}
        />
        <NumberInput
          label="Peso"
          value={data.peso}
          onChange={(v) => onChange('peso', v)}
          placeholder="0.0"
          unit="kg"
          min={0}
          step={0.1}
        />
      </div>

      <NumberInput
        label="Temperatura"
        value={data.temperatura}
        onChange={(v) => onChange('temperatura', v)}
        placeholder="38.5"
        unit="°C"
        min={35}
        step={0.1}
      />

      <div className="text-input">
        <label className="text-input__label">Motivo de consulta</label>
        <textarea
          className="text-input__field text-input__field--textarea"
          value={data.motivoConsulta}
          placeholder="Describe el motivo de la visita…"
          rows={3}
          onChange={(e) => onChange('motivoConsulta', e.target.value)}
        />
      </div>
    </section>
  );
}
