import { IDocumentexcel, NewDocumentexcel } from './documentexcel.model';

export const sampleWithRequiredData: IDocumentexcel = {
  id: 5304,
};

export const sampleWithPartialData: IDocumentexcel = {
  id: 26278,
  excel: '../fake-data/blob/hipster.png',
  excelContentType: 'unknown',
};

export const sampleWithFullData: IDocumentexcel = {
  id: 6604,
  excel: '../fake-data/blob/hipster.png',
  excelContentType: 'unknown',
};

export const sampleWithNewData: NewDocumentexcel = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
