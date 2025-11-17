import { ITypeDocument } from 'app/entities/type-document/type-document.model';

export interface IDocument {
  id: number;
  etat?: boolean | null;
  document1?: string | null;
  document1ContentType?: string | null;
  document2?: string | null;
  ref?: number | null;
  typeDocument?: ITypeDocument | null;
}

export type NewDocument = Omit<IDocument, 'id'> & { id: null };
