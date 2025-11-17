import { IEcole } from 'app/entities/ecole/ecole.model';
import { ISite } from 'app/entities/site/site.model';

export interface IProfil {
  id: number;
  etatProfil?: number | null;
  libelleProfil?: string | null;
  ecole?: IEcole | null;
  site?: ISite | null;
}

export type NewProfil = Omit<IProfil, 'id'> & { id: null };
