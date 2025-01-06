import { Moment } from 'moment';
import { IEtudiant } from 'app/shared/model/etudiant.model';
import { IClasse } from 'app/shared/model/classe.model';
import { IAnneescolaire } from 'app/shared/model/anneescolaire.model';
import { IDocument } from 'app/shared/model/document.model';

export interface IInscription {
    id?: number;
    date?: Moment;
    manquant?: boolean;
    etudiant?: IEtudiant;
    classe?: IClasse;
    anneescolaire?: IAnneescolaire;
    documents?: IDocument[];
}

export class Inscription implements IInscription {
    constructor(
        public id?: number,
        public date?: Moment,
        public manquant?: boolean,
        public etudiant?: IEtudiant,
        public classe?: IClasse,
        public anneescolaire?: IAnneescolaire,
        public documents?: IDocument[]
    ) {
        this.manquant = this.manquant || false;
    }
}
