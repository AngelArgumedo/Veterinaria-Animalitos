import { useState } from 'react';
import { PacienteSection } from '../../components/paciente-section/PacienteSection';
import { PropietarioSection } from '../../components/propietario-section/PropietarioSection';
import { PagoSection } from '../../components/pago-section/PagoSection';
import { Button } from '../../../../shared/components/button/Button';
import { crearIngreso } from '../../services/ingresos.service';
import type { IngresoFormData } from '../../models/ingreso.model';

const INITIAL_STATE: IngresoFormData = {
  mascotaNombre: '',
  especieId: 'canino',
  genero: 'MACHO',
  castradoEsterilizado: false,
  edad: '',
  peso: '',
  temperatura: '',
  motivoConsulta: '',
  propietarioNombre: '',
  propietarioDocumento: '',
  propietarioTelefono: '',
  propietarioEmail: '',
  valorTotal: '',
  metodoPago: 'EFECTIVO',
};

const fechaHoy = new Date().toLocaleDateString('es-CO', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function IngresoRapidoPage() {
  const [form, setForm] = useState<IngresoFormData>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  function handleChange<K extends keyof IngresoFormData>(
    field: K,
    value: IngresoFormData[K],
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      await crearIngreso(form);
      setSuccess(true);
      setForm(INITIAL_STATE);
      window.dispatchEvent(new CustomEvent('ingreso-guardado'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError('No se pudo guardar el ingreso. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="ingreso-page">
      <div className="ingreso-page__hero">
        <p className="ingreso-page__date">{fechaHoy}</p>
        <h1 className="ingreso-page__title">Ingreso Rápido</h1>
        <p className="ingreso-page__subtitle">Centro Veterinario Animalitos</p>
      </div>

      {success && (
        <div className="alert alert--success">
          ✓ Ingreso guardado correctamente
        </div>
      )}

      {error && (
        <div className="alert alert--error">
          ✕ {error}
        </div>
      )}

      <form className="ingreso-page__form" onSubmit={handleSubmit} noValidate>
        <PacienteSection data={form} onChange={handleChange} />
        <PropietarioSection data={form} onChange={handleChange} />
        <PagoSection data={form} onChange={handleChange} />

        <Button type="submit" loading={loading} variant="primary">
          Registrar Ingreso
        </Button>
      </form>
    </main>
  );
}
