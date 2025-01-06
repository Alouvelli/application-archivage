import { IEcole } from 'app/shared/model/ecole.model';
import { ISite } from 'app/shared/model/site.model';
import { IEmploye } from 'app/shared/model/employe.model';

export interface IProfil {
    id?: number;
    etatProfil?: number;
    libelleProfil?: string;
    ecole?: IEcole;
    site?: ISite;
    employes?: IEmploye[];
}

export class Profil implements IProfil {
    constructor(
        public id?: number,
        public etatProfil?: number,
        public libelleProfil?: string,
        public ecole?: IEcole,
        public site?: ISite,
        public employes?: IEmploye[]
    ) {}
}
