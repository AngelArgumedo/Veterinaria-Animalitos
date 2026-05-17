export interface IngresoModel {
  id: string;
  fecha: string;
  // Paciente
  mascotaId?: string;
  mascotaNombre?: string;
  especieId?: string;
  razaId?: string;
  genero?: string;
  castradoEsterilizado: boolean;
  edad?: string;
  peso?: number;
  temperatura?: number;
  motivoConsulta?: string;
  // Propietario
  propietarioId?: string;
  propietarioNombre?: string;
  propietarioDocumento?: string;
  propietarioTelefono?: string;
  propietarioEmail?: string;
  // Pago
  valorTotal?: number;
  metodoPago?: string;
  // Control
  synced: boolean;
  createdAt: string;
  updatedAt: string;
}
