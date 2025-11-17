import { IDepartement, NewDepartement } from './departement.model';

export const sampleWithRequiredData: IDepartement = {
  id: 4097,
  libelle: 'bè',
};

export const sampleWithPartialData: IDepartement = {
  id: 28436,
  etat: true,
  libelle: 'lorsque',
};

export const sampleWithFullData: IDepartement = {
  id: 19919,
  description: 'cocorico',
  etat: false,
  libelle: 'ha ha',
};

export const sampleWithNewData: NewDepartement = {
  libelle: 'près',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
