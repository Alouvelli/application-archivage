import { IUser } from 'app/core/user/user.model';
import { IProfil } from 'app/shared/model/profil.model';

export interface IEmploye {
    id?: number;
    telUtilisateur?: string;
    etatUtilisateur?: number;
    user?: IUser;
    profil?: IProfil;
}

export class Employe implements IEmploye {
    constructor(
        public id?: number,
        public telUtilisateur?: string,
        public etatUtilisateur?: number,
        public user?: IUser,
        public profil?: IProfil
    ) {}
}
