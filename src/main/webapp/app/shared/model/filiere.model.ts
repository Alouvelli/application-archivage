import { IDepartement } from 'app/shared/model/departement.model';

export interface IFiliere {
    id?: number;
    libelle?: string;
    description?: string;
    etat?: boolean;
    departement?: IDepartement;
}

export class Filiere implements IFiliere {
    constructor(
        public id?: number,
        public libelle?: string,
        public description?: string,
        public etat?: boolean,
        public departement?: IDepartement
    ) {
        this.etat = this.etat || false;
    }
}
