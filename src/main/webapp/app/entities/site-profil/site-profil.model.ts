import { ISite } from 'app/entities/site/site.model';
import { IProfil } from 'app/entities/profil/profil.model';

export interface ISiteProfil {
  id: number;
  encours?: boolean | null;
  site?: ISite | null;
  profil?: IProfil | null;
}

export type NewSiteProfil = Omit<ISiteProfil, 'id'> & { id: null };
