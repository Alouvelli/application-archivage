import { IProfil } from 'app/shared/model/profil.model';
import { IRubrique } from 'app/shared/model/rubrique.model';
import { IProfilModule } from 'app/shared/model/profil-module.model';

export interface IRubriqueProfil {
    id?: number;
    encours?: boolean;
    profil?: IProfil;
    rubrique?: IRubrique;
    profilModule?: IProfilModule;
}

export class RubriqueProfil implements IRubriqueProfil {
    constructor(
        public id?: number,
        public encours?: boolean,
        public profil?: IProfil,
        public rubrique?: IRubrique,
        public profilModule?: IProfilModule
    ) {
        this.encours = this.encours || false;
    }
}
