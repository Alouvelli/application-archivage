import { IFiliere } from 'app/entities/filiere/filiere.model';
import { INiveau } from 'app/entities/niveau/niveau.model';

export interface IClasse {
  id: number;
  description?: string | null;
  etat?: boolean | null;
  code?: string | null;
  libelle?: string | null;
  filiere?: IFiliere | null;
  niveau?: INiveau | null;
}

export type NewClasse = Omit<IClasse, 'id'> & { id: null };
