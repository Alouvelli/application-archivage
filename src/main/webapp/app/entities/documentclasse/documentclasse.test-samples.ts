import { IDocumentclasse, NewDocumentclasse } from './documentclasse.model';

export const sampleWithRequiredData: IDocumentclasse = {
  id: 21114,
};

export const sampleWithPartialData: IDocumentclasse = {
  id: 13398,
  nomdocument: 'hebdomadaire',
};

export const sampleWithFullData: IDocumentclasse = {
  id: 3873,
  document1: '../fake-data/blob/hipster.png',
  document1ContentType: 'unknown',
  ref: "à l'égard de",
  nomdocument: 'à la faveur de',
};

export const sampleWithNewData: NewDocumentclasse = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
