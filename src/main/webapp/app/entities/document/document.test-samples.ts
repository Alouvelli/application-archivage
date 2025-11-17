import { IDocument, NewDocument } from './document.model';

export const sampleWithRequiredData: IDocument = {
  id: 26644,
};

export const sampleWithPartialData: IDocument = {
  id: 2980,
  document1: '../fake-data/blob/hipster.png',
  document1ContentType: 'unknown',
  ref: 22414,
};

export const sampleWithFullData: IDocument = {
  id: 31599,
  etat: true,
  document1: '../fake-data/blob/hipster.png',
  document1ContentType: 'unknown',
  document2: '../fake-data/blob/hipster.txt',
  ref: 29185,
};

export const sampleWithNewData: NewDocument = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
