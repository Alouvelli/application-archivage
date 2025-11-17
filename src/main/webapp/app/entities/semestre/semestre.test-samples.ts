import { ISemestre, NewSemestre } from './semestre.model';

export const sampleWithRequiredData: ISemestre = {
  id: 4178,
};

export const sampleWithPartialData: ISemestre = {
  id: 7066,
  etat: 12387,
};

export const sampleWithFullData: ISemestre = {
  id: 21069,
  libelle: 'oh coin-coin',
  etat: 909,
};

export const sampleWithNewData: NewSemestre = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
