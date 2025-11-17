import { IProfil } from 'app/entities/profil/profil.model';
import { IRubrique } from 'app/entities/rubrique/rubrique.model';
import { IProfilModule } from 'app/entities/profil-module/profil-module.model';

export interface IRubriqueProfil {
  id: number;
  encours?: boolean | null;
  profil?: IProfil | null;
  rubrique?: IRubrique | null;
  profilModule?: IProfilModule | null;
}

export type NewRubriqueProfil = Omit<IRubriqueProfil, 'id'> & { id: null };
