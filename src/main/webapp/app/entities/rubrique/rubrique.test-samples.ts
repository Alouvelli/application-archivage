import { IRubrique, NewRubrique } from './rubrique.model';

export const sampleWithRequiredData: IRubrique = {
  id: 18924,
};

export const sampleWithPartialData: IRubrique = {
  id: 14556,
  rangRubrique: 'appeler sursauter coin-coin',
  iconeRubrique: 'hâter frapper',
  rang: 19164,
};

export const sampleWithFullData: IRubrique = {
  id: 9089,
  libelleRubrique: 'personnel',
  rangRubrique: "à l'instar de altruiste croâ",
  iconeRubrique: 'ci',
  etatRubrique: 16213,
  rang: 11325,
};

export const sampleWithNewData: NewRubrique = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
