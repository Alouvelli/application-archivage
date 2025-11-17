import dayjs from 'dayjs/esm';

export interface IApplication {
  id: number;
  nomApplication?: string | null;
  versionApplication?: string | null;
  logoApplication?: string | null;
  coutApplication?: string | null;
  dateVente?: dayjs.Dayjs | null;
  maintenance?: number | null;
  contratMaintenance?: string | null;
  dateDebut?: dayjs.Dayjs | null;
  dateFin?: dayjs.Dayjs | null;
  etatApplication?: number | null;
}

export type NewApplication = Omit<IApplication, 'id'> & { id: null };
