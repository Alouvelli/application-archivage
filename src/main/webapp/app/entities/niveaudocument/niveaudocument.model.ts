import { INiveau } from 'app/entities/niveau/niveau.model';
import { IDocument } from 'app/entities/document/document.model';

export interface INiveaudocument {
  id: number;
  etat?: boolean | null;
  niveau?: INiveau | null;
  document?: IDocument | null;
}

export type NewNiveaudocument = Omit<INiveaudocument, 'id'> & { id: null };
