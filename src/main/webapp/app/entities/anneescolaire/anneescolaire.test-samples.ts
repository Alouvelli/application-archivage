import { IAnneescolaire, NewAnneescolaire } from './anneescolaire.model';

export const sampleWithRequiredData: IAnneescolaire = {
  id: 13307,
};

export const sampleWithPartialData: IAnneescolaire = {
  id: 16169,
  libelle: 'terriblement au-dedans de fade',
  encours: 'quelquefois',
};

export const sampleWithFullData: IAnneescolaire = {
  id: 3799,
  libelle: 'prestataire de services en decà de guider',
  encours: 'coac coac enfin tant',
  etat: 'coûter',
};

export const sampleWithNewData: NewAnneescolaire = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
