import dayjs from 'dayjs/esm';

import { IApplication, NewApplication } from './application.model';

export const sampleWithRequiredData: IApplication = {
  id: 15800,
};

export const sampleWithPartialData: IApplication = {
  id: 25150,
  logoApplication: 'toujours comme cocorico',
  coutApplication: 'tant que',
  dateVente: dayjs('2019-06-03'),
  contratMaintenance: 'ding',
  etatApplication: 2268,
};

export const sampleWithFullData: IApplication = {
  id: 12884,
  nomApplication: 'tchou tchouu grimper',
  versionApplication: 'ha énergique',
  logoApplication: "d'après vouh",
  coutApplication: 'imiter quand ?',
  dateVente: dayjs('2019-06-03'),
  maintenance: 12271,
  contratMaintenance: 'tellement afin que énorme',
  dateDebut: dayjs('2019-06-03'),
  dateFin: dayjs('2019-06-03'),
  etatApplication: 5988,
};

export const sampleWithNewData: NewApplication = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
