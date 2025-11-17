import { IUser } from 'app/entities/user/user.model';
import { IProfil } from 'app/entities/profil/profil.model';

export interface IEmploye {
  id: number;
  telUtilisateur?: string | null;
  etatUtilisateur?: number | null;
  user?: Pick<IUser, 'id'> | null;
  profil?: IProfil | null;
}

export type NewEmploye = Omit<IEmploye, 'id'> & { id: null };
