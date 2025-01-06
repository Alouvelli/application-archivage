import { IApplication } from 'app/shared/model/application.model';
import { ISite } from 'app/shared/model/site.model';
import { IProfil } from 'app/shared/model/profil.model';

export interface IEcole {
    id?: number;

    codeEcole?: string;
    logoEcole?: string;
    enteteEcole?: string;
    basPageEcole?: string;
    nineaEcole?: string;
    adresseEcole?: string;
    telephoneEcole?: string;
    emailEcole?: string;
    sigleEcole?: string;
    faxEcole?: string;
    etatEcole?: number;
    encours?: number;
    rang?: number;
    application?: IApplication;
    sites?: ISite[];
    profils?: IProfil[];
    selectedSite?:boolean;
}

export class Ecole implements IEcole {
    constructor(
        public id?: number,
        public codeEcole?: string,
        public logoEcole?: string,
        public enteteEcole?: string,
        public basPageEcole?: string,
        public nineaEcole?: string,
        public adresseEcole?: string,
        public telephoneEcole?: string,
        public emailEcole?: string,
        public sigleEcole?: string,
        public faxEcole?: string,
        public etatEcole?: number,
        public encours?: number,
        public rang?: number,
        public application?: IApplication,
        public sites?: ISite[],
        public profils?: IProfil[],
        public selectedSite?:boolean
    ) {}
}
