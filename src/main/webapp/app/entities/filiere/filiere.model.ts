import { IDepartement } from 'app/entities/departement/departement.model';

export interface IFiliere {
  id: number;
  libelle?: string | null;
  description?: string | null;
  etat?: boolean | null;
  departement?: IDepartement | null;
}

export type NewFiliere = Omit<IFiliere, 'id'> & { id: null };
