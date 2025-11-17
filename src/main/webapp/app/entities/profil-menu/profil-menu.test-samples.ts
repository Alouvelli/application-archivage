import { IProfilMenu, NewProfilMenu } from './profil-menu.model';

export const sampleWithRequiredData: IProfilMenu = {
  id: 7317,
};

export const sampleWithPartialData: IProfilMenu = {
  id: 7751,
  ajouter: 21834,
  supprimer: 32267,
};

export const sampleWithFullData: IProfilMenu = {
  id: 10332,
  voir: 12607,
  ajouter: 5960,
  supprimer: 15598,
  modifier: 1972,
  imprimer: 29088,
};

export const sampleWithNewData: NewProfilMenu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
