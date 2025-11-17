import { IApplication } from 'app/entities/application/application.model';

export interface IEcole {
  id: number;
  codeEcole?: string | null;
  logoEcole?: string | null;
  enteteEcole?: string | null;
  basPageEcole?: string | null;
  nineaEcole?: string | null;
  adresseEcole?: string | null;
  telephoneEcole?: string | null;
  emailEcole?: string | null;
  sigleEcole?: string | null;
  faxEcole?: string | null;
  etatEcole?: number | null;
  encours?: number | null;
  rang?: number | null;
  application?: IApplication | null;
}

export type NewEcole = Omit<IEcole, 'id'> & { id: null };
