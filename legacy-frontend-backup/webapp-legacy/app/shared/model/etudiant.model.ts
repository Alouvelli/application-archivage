export interface IEtudiant {
    id?: number;
    nom?: string;
    prenom?: string;
    dateNaissance?: string;
    tel?: string;
    email?: string;
    adresse?: string;
    etat?: boolean;
    matricule?: string;
}

export class Etudiant implements IEtudiant {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public dateNaissance?: string,
        public tel?: string,
        public email?: string,
        public adresse?: string,
        public etat?: boolean,
        public matricule?: string
    ) {
        this.etat = this.etat || false;
    }
}
