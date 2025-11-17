export interface ISemestre {
  id: number;
  libelle?: string | null;
  etat?: number | null;
}

export type NewSemestre = Omit<ISemestre, 'id'> & { id: null };
