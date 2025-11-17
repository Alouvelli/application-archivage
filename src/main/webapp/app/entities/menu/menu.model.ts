import { IRubrique } from 'app/entities/rubrique/rubrique.model';

export interface IMenu {
  id: number;
  codeMenu?: string | null;
  libelleMenu?: string | null;
  rangMenu?: string | null;
  urlMenu?: string | null;
  iconeMenu?: string | null;
  etatMenu?: number | null;
  rubrique?: IRubrique | null;
}

export type NewMenu = Omit<IMenu, 'id'> & { id: null };
