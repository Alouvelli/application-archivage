import { IModule, NewModule } from './module.model';

export const sampleWithRequiredData: IModule = {
  id: 9747,
};

export const sampleWithPartialData: IModule = {
  id: 19611,
  logoModule: 'prestataire de services trop',
  etatModule: 17422,
  rang: 27223,
};

export const sampleWithFullData: IModule = {
  id: 1292,
  libelleModule: 'redescendre',
  logoModule: 'paf posséder ah',
  etatModule: 1908,
  rang: 30281,
};

export const sampleWithNewData: NewModule = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
