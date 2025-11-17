import { ISiteProfil, NewSiteProfil } from './site-profil.model';

export const sampleWithRequiredData: ISiteProfil = {
  id: 9891,
};

export const sampleWithPartialData: ISiteProfil = {
  id: 29701,
  encours: true,
};

export const sampleWithFullData: ISiteProfil = {
  id: 209,
  encours: true,
};

export const sampleWithNewData: NewSiteProfil = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
