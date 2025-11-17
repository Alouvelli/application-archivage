import { ISite } from 'app/shared/model/site.model';
import { IProfil } from 'app/shared/model/profil.model';

export interface ISiteProfil {
    id?: number;
    encours?: boolean;
    site?: ISite;
    profil?: IProfil;
}

export class SiteProfil implements ISiteProfil {
    constructor(public id?: number, public encours?: boolean, public site?: ISite, public profil?: IProfil) {
        this.encours = this.encours || false;
    }
}
