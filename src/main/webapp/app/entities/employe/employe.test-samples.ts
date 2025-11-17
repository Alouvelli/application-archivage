import { IEmploye, NewEmploye } from './employe.model';

export const sampleWithRequiredData: IEmploye = {
  id: 27930,
};

export const sampleWithPartialData: IEmploye = {
  id: 2163,
  telUtilisateur: 'désormais',
  etatUtilisateur: 24418,
};

export const sampleWithFullData: IEmploye = {
  id: 9509,
  telUtilisateur: 'en dépit de chut blême',
  etatUtilisateur: 23384,
};

export const sampleWithNewData: NewEmploye = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
