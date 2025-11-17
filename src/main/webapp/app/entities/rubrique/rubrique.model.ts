import { IModule } from 'app/entities/module/module.model';

export interface IRubrique {
  id: number;
  libelleRubrique?: string | null;
  rangRubrique?: string | null;
  iconeRubrique?: string | null;
  etatRubrique?: number | null;
  rang?: number | null;
  module?: IModule | null;
}

export type NewRubrique = Omit<IRubrique, 'id'> & { id: null };
