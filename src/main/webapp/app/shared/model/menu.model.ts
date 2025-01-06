import { IProfilMenu } from 'app/shared/model/profil-menu.model';
import { IRubrique } from 'app/shared/model/rubrique.model';

export interface IMenu {
    id?: number;
    codeMenu?: string;
    libelleMenu?: string;
    rangMenu?: string;
    urlMenu?: string;
    iconeMenu?: string;
    etatMenu?: number;
    profilMenus?: IProfilMenu[];
    rubrique?: IRubrique;
    selectedSite?:boolean;
    enCours?:boolean;
    profilMenu?: IProfilMenu;
}

export class Menu implements IMenu {
    constructor(
        public id?: number,
        public codeMenu?: string,
        public libelleMenu?: string,
        public rangMenu?: string,
        public urlMenu?: string,
        public iconeMenu?: string,
        public etatMenu?: number,
        public profilMenus?: IProfilMenu[],
        public rubrique?: IRubrique,
        public selectedSite?:false,
        public enCours?:false,
        public profilMenu?: IProfilMenu,
    ) {}
}
