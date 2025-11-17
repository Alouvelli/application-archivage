import { IProfilModule, NewProfilModule } from './profil-module.model';

export const sampleWithRequiredData: IProfilModule = {
  id: 18858,
};

export const sampleWithPartialData: IProfilModule = {
  id: 28219,
  encours: true,
};

export const sampleWithFullData: IProfilModule = {
  id: 14356,
  encours: true,
};

export const sampleWithNewData: NewProfilModule = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
