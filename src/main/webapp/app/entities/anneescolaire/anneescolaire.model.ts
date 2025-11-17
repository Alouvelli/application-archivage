export interface IAnneescolaire {
  id: number;
  libelle?: string | null;
  encours?: string | null;
  etat?: string | null;
}

export type NewAnneescolaire = Omit<IAnneescolaire, 'id'> & { id: null };
