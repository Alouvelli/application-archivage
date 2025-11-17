import dayjs from 'dayjs/esm';

import { IInscription, NewInscription } from './inscription.model';

export const sampleWithRequiredData: IInscription = {
  id: 8882,
};

export const sampleWithPartialData: IInscription = {
  id: 29408,
  date: dayjs('2019-07-26'),
  manquant: true,
};

export const sampleWithFullData: IInscription = {
  id: 25479,
  date: dayjs('2019-07-26'),
  manquant: false,
};

export const sampleWithNewData: NewInscription = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
