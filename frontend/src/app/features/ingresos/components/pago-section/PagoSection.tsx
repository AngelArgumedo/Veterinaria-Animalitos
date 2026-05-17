import { ChipGroup } from '../../../../shared/components/chip-group/ChipGroup';
import { NumberInput } from '../../../../shared/components/number-input/NumberInput';
import type { IngresoFormData, MetodoPago } from '../../models/ingreso.model';

const METODOS_PAGO: { value: MetodoPago; label: string }[] = [
  { value: 'EFECTIVO',      label: '💵 Efectivo' },
  { value: 'TARJETA',       label: '💳 Tarjeta' },
  { value: 'TRANSFERENCIA', label: '📲 Transferencia' },
];

interface PagoSectionProps {
  data: Pick<IngresoFormData, 'valorTotal' | 'metodoPago'>;
  onChange: <K extends keyof IngresoFormData>(field: K, value: IngresoFormData[K]) => void;
}

export function PagoSection({ data, onChange }: PagoSectionProps) {
  return (
    <section className="form-section">
      <div className="form-section__header">
        <span className="form-section__icon" aria-hidden="true">💰</span>
        <h2 className="form-section__title">Pago</h2>
      </div>

      <NumberInput
        label="Valor de la consulta"
        value={data.valorTotal}
        onChange={(v) => onChange('valorTotal', v)}
        prefix="$"
        placeholder="0"
        min={0}
        step={1000}
      />

      <ChipGroup
        label="Método de pago"
        options={METODOS_PAGO}
        value={data.metodoPago}
        onChange={(v) => onChange('metodoPago', v)}
      />
    </section>
  );
}
