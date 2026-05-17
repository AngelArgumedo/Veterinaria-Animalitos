export type Especie = 'canino' | 'felino' | 'otro';
export type Genero = 'MACHO' | 'HEMBRA';
export type MetodoPago = 'EFECTIVO' | 'TARJETA' | 'TRANSFERENCIA';

export interface IngresoFormData {
  // Paciente
  mascotaNombre: string;
  especieId: Especie;
  genero: Genero;
  castradoEsterilizado: boolean;
  edad: string;
  peso: string;
  temperatura: string;
  motivoConsulta: string;

  // Propietario
  propietarioNombre: string;
  propietarioDocumento: string;
  propietarioTelefono: string;
  propietarioEmail: string;

  // Pago
  valorTotal: string;
  metodoPago: MetodoPago;
}

export interface Ingreso extends IngresoFormData {
  id: string;
  fecha: string;
  synced: boolean;
  createdAt: string;
  updatedAt: string;
}
