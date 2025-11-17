import { ITypeDocument, NewTypeDocument } from './type-document.model';

export const sampleWithRequiredData: ITypeDocument = {
  id: 25578,
};

export const sampleWithPartialData: ITypeDocument = {
  id: 24412,
  libelle: 'de peur que broum',
  description: 'diplomate',
  etat: false,
};

export const sampleWithFullData: ITypeDocument = {
  id: 5743,
  libelle: 'équipe',
  description: 'quand',
  etat: false,
};

export const sampleWithNewData: NewTypeDocument = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
