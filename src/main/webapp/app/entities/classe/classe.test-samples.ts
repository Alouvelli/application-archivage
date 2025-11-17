import { IClasse, NewClasse } from './classe.model';

export const sampleWithRequiredData: IClasse = {
  id: 27400,
  code: 'sympathique',
  libelle: 'restaurer douter très',
};

export const sampleWithPartialData: IClasse = {
  id: 8540,
  etat: false,
  code: 'adepte avant de antagoniste',
  libelle: 'dring',
};

export const sampleWithFullData: IClasse = {
  id: 2624,
  description: 'déplacer',
  etat: true,
  code: 'autour de',
  libelle: 'séculaire',
};

export const sampleWithNewData: NewClasse = {
  code: 'd’autant que',
  libelle: 'blablabla ah pour',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
