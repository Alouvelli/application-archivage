import { INiveau, NewNiveau } from './niveau.model';

export const sampleWithRequiredData: INiveau = {
  id: 19468,
};

export const sampleWithPartialData: INiveau = {
  id: 25187,
  libelle: 'propre via délectable',
  description: 'sitôt actionnaire jeune enfant',
};

export const sampleWithFullData: INiveau = {
  id: 2583,
  libelle: 'toc avant de nourrir',
  description: 'trop après',
  etat: true,
  encours: false,
};

export const sampleWithNewData: NewNiveau = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
