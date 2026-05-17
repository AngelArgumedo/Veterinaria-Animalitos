export interface PropietarioModel {
  id: string;
  nombres: string;
  apellidos: string;
  ciudad: string;
  direccion?: string;
  telefono?: string;
  whatsapp?: string;
  email?: string;
  tipoDocumento?: string;
  documento: string;
  digitoVerificador?: string;
  ocupacion?: string;
  comoConociо?: string;
  valoracion?: string;
  observaciones?: string;
  aceptaWhatsapp: boolean;
  aceptaEmail: boolean;
  synced: boolean;
  createdAt: string;
  updatedAt: string;
}
