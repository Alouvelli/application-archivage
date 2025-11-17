import { IFiliere } from 'app/shared/model/filiere.model';
import { INiveau } from 'app/shared/model/niveau.model';

export interface IClasse {
    id?: number;
    description?: string;
    etat?: boolean;
    code?: string;
    libelle?: string;
    filiere?: IFiliere;
    niveau?: INiveau;
}

export class Classe implements IClasse {
    constructor(
        public id?: number,
        public description?: string,
        public etat?: boolean,
        public code?: string,
        public libelle?: string,
        public filiere?: IFiliere,
        public niveau?: INiveau
    ) {
        this.etat = this.etat || false;
    }
}
