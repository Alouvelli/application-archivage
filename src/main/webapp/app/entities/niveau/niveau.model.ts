import { ITypeDocument } from 'app/entities/type-document/type-document.model';

export interface INiveau {
  id: number;
  libelle?: string | null;
  description?: string | null;
  etat?: boolean | null;
  encours?: boolean | null;
  typeDocuments?: ITypeDocument[] | null;
}

export type NewNiveau = Omit<INiveau, 'id'> & { id: null };
