import { IEcole } from 'app/entities/ecole/ecole.model';
import { IModule } from 'app/entities/module/module.model';

export interface ISite {
  id: number;
  codeSite?: string | null;
  logoSite?: string | null;
  enteteSite?: string | null;
  basPageSite?: string | null;
  nineaSite?: string | null;
  adresseSite?: string | null;
  telephone?: string | null;
  emailSite?: string | null;
  sigleSite?: string | null;
  faxEcole?: string | null;
  etatSite?: number | null;
  encours?: number | null;
  rang?: number | null;
  ecole?: IEcole | null;
  modules?: IModule[] | null;
}

export type NewSite = Omit<ISite, 'id'> & { id: null };
