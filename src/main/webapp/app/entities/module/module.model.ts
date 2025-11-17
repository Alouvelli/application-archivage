import { ISite } from 'app/entities/site/site.model';

export interface IModule {
  id: number;
  libelleModule?: string | null;
  logoModule?: string | null;
  etatModule?: number | null;
  rang?: number | null;
  sites?: ISite[] | null;
}

export type NewModule = Omit<IModule, 'id'> & { id: null };
