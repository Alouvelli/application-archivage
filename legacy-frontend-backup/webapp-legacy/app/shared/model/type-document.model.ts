export interface ITypeDocument {
    id?: number;
    libelle?: string;
    description?: string;
    etat?: boolean;
}

export class TypeDocument implements ITypeDocument {
    constructor(public id?: number, public libelle?: string, public description?: string, public etat?: boolean) {
        this.etat = this.etat || false;
    }
}
