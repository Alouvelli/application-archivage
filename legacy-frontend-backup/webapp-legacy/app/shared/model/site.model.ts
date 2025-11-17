import { IEcole } from 'app/shared/model/ecole.model';
import { IProfil } from 'app/shared/model/profil.model';
import { IModule } from 'app/shared/model/module.model';

export interface ISite {
    id?: number;
    codeSite?: string;
    logoSite?: string;
    enteteSite?: string;
    basPageSite?: string;
    nineaSite?: string;
    adresseSite?: string;
    telephone?: string;
    emailSite?: string;
    sigleSite?: string;
    faxSite?: string;
    encours?: number;
    etatSite?: number;
    rang?: number;
    ecole?: IEcole;
    profils?: IProfil[];
    modules?: IModule[];
    selectedSite?: boolean;
    enCours?: boolean;
    idMere?: string;
    ancienEncours?: boolean;
    encours1?: boolean;
    ancien1?: string;
}

export class Site implements ISite {
    constructor(
        public id?: number,
        public codeSite?: string,
        public logoSite?: string,
        public enteteSite?: string,
        public basPageSite?: string,
        public nineaSite?: string,
        public adresseSite?: string,
        public telephone?: string,
        public emailSite?: string,
        public sigleSite?: string,
        public faxSite?: string,
        public etatSite?: number,
        public encours?: number,
        public rang?: number,
        public ecole?: IEcole,
        public profils?: IProfil[],
        public modules?: IModule[],
        public selectedSite = false,
        public enCours = false,
        public idMere?: string,
        public ancienEncours?: boolean,
        public encours1?: boolean,
        public ancien1?: string

    ) {}
}
