export interface MascotaModel {
  id: string;
  noHistoria?: string;
  noMicrochip?: string;
  nombre: string;
  especieId: string;
  razaId?: string;
  propietarioId?: string;
  genero: string;
  estadoReproductivo?: string;
  fechaNacimiento?: string;
  temperamento?: string;
  peso?: number;
  color?: string;
  alergias?: string;
  fotoUrl?: string;
  synced: boolean;
  createdAt: string;
  updatedAt: string;
}
