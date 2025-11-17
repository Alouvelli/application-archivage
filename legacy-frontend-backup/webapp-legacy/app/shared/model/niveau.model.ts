import { ITypeDocument } from 'app/shared/model/type-document.model';

export interface INiveau {
    id?: number;
    libelle?: string;
    description?: string;
    etat?: boolean;
    encours?: boolean;
    typeDocuments?: ITypeDocument[];
}

export class Niveau implements INiveau {
    constructor(
        public id?: number,
        public libelle?: string,
        public description?: string,
        public etat?: boolean,
        public encours?: boolean,
        public typeDocuments?: ITypeDocument[]
    ) {
        this.etat = this.etat || false;
        this.encours = this.encours || false;
    }
}
