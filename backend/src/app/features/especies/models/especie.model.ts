export interface EspecieModel {
  id: string;
  nombre: string;
  razas?: RazaModel[];
}

export interface RazaModel {
  id: string;
  especieId: string;
  nombre: string;
  isCustom: boolean;
}
