import { IRubriqueProfil, NewRubriqueProfil } from './rubrique-profil.model';

export const sampleWithRequiredData: IRubriqueProfil = {
  id: 13424,
};

export const sampleWithPartialData: IRubriqueProfil = {
  id: 32385,
  encours: true,
};

export const sampleWithFullData: IRubriqueProfil = {
  id: 24939,
  encours: true,
};

export const sampleWithNewData: NewRubriqueProfil = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
