import { IProfil, NewProfil } from './profil.model';

export const sampleWithRequiredData: IProfil = {
  id: 21388,
};

export const sampleWithPartialData: IProfil = {
  id: 8380,
  libelleProfil: 'au lieu de conseil municipal population du Québec',
};

export const sampleWithFullData: IProfil = {
  id: 31533,
  etatProfil: 1180,
  libelleProfil: 'cadre après que',
};

export const sampleWithNewData: NewProfil = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
