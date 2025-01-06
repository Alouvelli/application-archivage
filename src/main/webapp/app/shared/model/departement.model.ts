export interface IDepartement {
    id?: number;
    description?: string;
    etat?: boolean;
    libelle?: string;
}

export class Departement implements IDepartement {
    constructor(public id?: number, public description?: string, public etat?: boolean, public libelle?: string) {
        this.etat = this.etat || false;
    }
}
