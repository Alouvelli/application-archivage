import { IProfil } from 'app/entities/profil/profil.model';
import { IMenu } from 'app/entities/menu/menu.model';
import { IRubriqueProfil } from 'app/entities/rubrique-profil/rubrique-profil.model';

export interface IProfilMenu {
  id: number;
  voir?: number | null;
  ajouter?: number | null;
  supprimer?: number | null;
  modifier?: number | null;
  imprimer?: number | null;
  profil?: IProfil | null;
  menu?: IMenu | null;
  rubriqueProfil?: IRubriqueProfil | null;
}

export type NewProfilMenu = Omit<IProfilMenu, 'id'> & { id: null };
