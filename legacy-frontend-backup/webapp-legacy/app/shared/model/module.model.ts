import { IRubrique } from 'app/shared/model/rubrique.model';
import { IProfilModule } from 'app/shared/model/profil-module.model';
import { ISite } from 'app/shared/model/site.model';

export interface IModule {
    id?: number;
    libelleModule?: string;
    logoModule?: string;
    etatModule?: number;
    rang?: number;
    rubriques?: IRubrique[];
    profilModules?: IProfilModule[];
    sites?: ISite[];
    selectedSite?:boolean;
    enCours?:boolean;
}

export class Module implements IModule {
    constructor(
        public id?: number,
        public libelleModule?: string,
        public logoModule?: string,
        public etatModule?: number,
        public rang?: number,
        public rubriques?: IRubrique[],
        public profilModules?: IProfilModule[],
        public sites?: ISite[],
        public selectedSite?:false,
        public enCours?:false,
    ) {}
}
