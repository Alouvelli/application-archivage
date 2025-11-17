import { IMenu } from 'app/shared/model/menu.model';
import { IRubriqueProfil } from 'app/shared/model/rubrique-profil.model';
import { IModule } from 'app/shared/model/module.model';

export interface IRubrique {
    id?: number;
    libelleRubrique?: string;
    rangRubrique?: string;
    iconeRubrique?: string;
    etatRubrique?: number;
    rang?: number;
    menus?: IMenu[];
    rubriqueProfils?: IRubriqueProfil[];
    module?: IModule;
    selectedSite?:boolean;
    enCours?:boolean;
}

export class Rubrique implements IRubrique {
    constructor(
        public id?: number,
        public libelleRubrique?: string,
        public rangRubrique?: string,
        public iconeRubrique?: string,
        public etatRubrique?: number,
        public rang?: number,
        public menus?: IMenu[],
        public rubriqueProfils?: IRubriqueProfil[],
        public module?: IModule,
        public selectedSite?:false,
        public enCours?:false,
    ) {}
}
