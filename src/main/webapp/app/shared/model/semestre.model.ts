export interface ISemestre {
    id?: number;
    libelle?: string;
    etat?: number;
}

export class Semestre implements ISemestre {
    constructor(public id?: number, public libelle?: string, public etat?: number) {}
}
