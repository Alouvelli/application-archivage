import { IEcole, NewEcole } from './ecole.model';

export const sampleWithRequiredData: IEcole = {
  id: 5976,
};

export const sampleWithPartialData: IEcole = {
  id: 18575,
  logoEcole: 'ha ha',
  sigleEcole: 'en dedans de sembler au cas où',
  rang: 25680,
};

export const sampleWithFullData: IEcole = {
  id: 24498,
  codeEcole: 'si tic-tac communauté étudiante',
  logoEcole: 'sitôt que porte-parole hôte',
  enteteEcole: 'liquider que',
  basPageEcole: 'parfois lorsque dans la mesure où',
  nineaEcole: 'concurrence adversaire',
  adresseEcole: 'membre à vie secours',
  telephoneEcole: 'pendant que dring brusque',
  emailEcole: 'évacuer pourvu que',
  sigleEcole: 'rose malade jeune enfant',
  faxEcole: 'expédier souffler sale',
  etatEcole: 22903,
  encours: 7875,
  rang: 24328,
};

export const sampleWithNewData: NewEcole = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
