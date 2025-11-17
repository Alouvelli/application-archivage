export interface IDepartement {
  id: number;
  description?: string | null;
  etat?: boolean | null;
  libelle?: string | null;
}

export type NewDepartement = Omit<IDepartement, 'id'> & { id: null };
