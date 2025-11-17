import { INiveaudocument, NewNiveaudocument } from './niveaudocument.model';

export const sampleWithRequiredData: INiveaudocument = {
  id: 30356,
};

export const sampleWithPartialData: INiveaudocument = {
  id: 6066,
  etat: false,
};

export const sampleWithFullData: INiveaudocument = {
  id: 30219,
  etat: false,
};

export const sampleWithNewData: NewNiveaudocument = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
