import { ISite, NewSite } from './site.model';

export const sampleWithRequiredData: ISite = {
  id: 15724,
};

export const sampleWithPartialData: ISite = {
  id: 19445,
  logoSite: 'ha ha de trop',
  nineaSite: 'crac guère sitôt que',
  telephone: '+33 109355696',
  sigleSite: 'mature prestataire de services émérite',
  faxEcole: "d'abord",
  encours: 1120,
  rang: 5913,
};

export const sampleWithFullData: ISite = {
  id: 31836,
  codeSite: 'cyan',
  logoSite: 'commissionnaire trop',
  enteteSite: 'espiègle exprès',
  basPageSite: 'dring alors collègue',
  nineaSite: 'ouin même si',
  adresseSite: 'contre',
  telephone: '+33 114554816',
  emailSite: 'oups souhaiter',
  sigleSite: 'que pin-pon',
  faxEcole: 'mature',
  etatSite: 15069,
  encours: 4516,
  rang: 20559,
};

export const sampleWithNewData: NewSite = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
