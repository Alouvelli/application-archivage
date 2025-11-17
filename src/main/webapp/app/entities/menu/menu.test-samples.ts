import { IMenu, NewMenu } from './menu.model';

export const sampleWithRequiredData: IMenu = {
  id: 26476,
};

export const sampleWithPartialData: IMenu = {
  id: 11734,
  codeMenu: 'si secours',
  libelleMenu: 'assez déjà orange',
  iconeMenu: 'parce que',
  etatMenu: 9429,
};

export const sampleWithFullData: IMenu = {
  id: 277,
  codeMenu: 'étouffer juriste',
  libelleMenu: 'de',
  rangMenu: 'prout',
  urlMenu: 'moderne dispenser',
  iconeMenu: 'transporter enfermer',
  etatMenu: 18025,
};

export const sampleWithNewData: NewMenu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
