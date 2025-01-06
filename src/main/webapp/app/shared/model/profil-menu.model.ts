import { IProfil } from 'app/shared/model/profil.model';
import { IMenu } from 'app/shared/model/menu.model';
import { IRubriqueProfil } from 'app/shared/model/rubrique-profil.model';

export interface IProfilMenu {
    id?: number;
    voir?: number;
    ajouter?: number;
    supprimer?: number;
    modifier?: number;
    imprimer?: number;
    profil?: IProfil;
    menu?: IMenu;
    rubriqueProfil?: IRubriqueProfil;
}

export class ProfilMenu implements IProfilMenu {
    constructor(
        public id?: number,
        public voir?: number,
        public ajouter?: number,
        public supprimer?: number,
        public modifier?: number,
        public imprimer?: number,
        public profil?: IProfil,
        public menu?: IMenu,
        public rubriqueProfil?: IRubriqueProfil
    ) {}
}
