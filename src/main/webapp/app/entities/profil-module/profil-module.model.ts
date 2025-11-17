import { IProfil } from 'app/entities/profil/profil.model';
import { IModule } from 'app/entities/module/module.model';
import { ISiteProfil } from 'app/entities/site-profil/site-profil.model';

export interface IProfilModule {
  id: number;
  encours?: boolean | null;
  profil?: IProfil | null;
  module?: IModule | null;
  siteProfil?: ISiteProfil | null;
}

export type NewProfilModule = Omit<IProfilModule, 'id'> & { id: null };
