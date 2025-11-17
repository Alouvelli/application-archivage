import dayjs from 'dayjs/esm';
import { IEtudiant } from 'app/entities/etudiant/etudiant.model';
import { IClasse } from 'app/entities/classe/classe.model';
import { IAnneescolaire } from 'app/entities/anneescolaire/anneescolaire.model';
import { IDocument } from 'app/entities/document/document.model';

export interface IInscription {
  id: number;
  date?: dayjs.Dayjs | null;
  manquant?: boolean | null;
  etudiant?: IEtudiant | null;
  classe?: IClasse | null;
  anneescolaire?: IAnneescolaire | null;
  documents?: IDocument[] | null;
}

export type NewInscription = Omit<IInscription, 'id'> & { id: null };
