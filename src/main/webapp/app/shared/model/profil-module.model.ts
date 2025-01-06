import { IProfil } from 'app/shared/model/profil.model';
import { IModule } from 'app/shared/model/module.model';
import { ISiteProfil } from 'app/shared/model/site-profil.model';

export interface IProfilModule {
    id?: number;
    encours?: boolean;
    profil?: IProfil;
    module?: IModule;
    siteProfil?: ISiteProfil;
}

export class ProfilModule implements IProfilModule {
    constructor(
        public id?: number,
        public encours?: boolean,
        public profil?: IProfil,
        public module?: IModule,
        public siteProfil?: ISiteProfil
    ) {
        this.encours = this.encours || false;
    }
}
