import { IFiliere, NewFiliere } from './filiere.model';

export const sampleWithRequiredData: IFiliere = {
  id: 23000,
  libelle: 'assimiler souvent quelquefois',
};

export const sampleWithPartialData: IFiliere = {
  id: 10259,
  libelle: 'incognito parlementaire',
};

export const sampleWithFullData: IFiliere = {
  id: 19526,
  libelle: 'foule',
  description: 'aimable',
  etat: false,
};

export const sampleWithNewData: NewFiliere = {
  libelle: 'pin-pon',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
