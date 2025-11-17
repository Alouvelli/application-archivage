import { IClasse } from 'app/entities/classe/classe.model';
import { ISemestre } from 'app/entities/semestre/semestre.model';

export interface IDocumentclasse {
  id: number;
  document1?: string | null;
  document1ContentType?: string | null;
  ref?: string | null;
  nomdocument?: string | null;
  classe?: IClasse | null;
  semestre?: ISemestre | null;
}

export type NewDocumentclasse = Omit<IDocumentclasse, 'id'> & { id: null };
