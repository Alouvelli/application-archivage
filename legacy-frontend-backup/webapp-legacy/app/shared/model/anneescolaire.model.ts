export interface IAnneescolaire {
    id?: number;
    libelle?: string;
    encours?: string;
    etat?: string;
}

export class Anneescolaire implements IAnneescolaire {
    constructor(public id?: number, public libelle?: string, public encours?: string, public etat?: string) {}
}
