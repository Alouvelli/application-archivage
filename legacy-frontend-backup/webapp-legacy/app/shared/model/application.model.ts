import { Dayjs } from 'dayjs/esm';
import { IEcole } from 'app/shared/model/ecole.model';

export interface IApplication {
    id?: number;
    nomApplication?: string;
    versionApplication?: string;
    logoApplication?: string;
    coutApplication?: string;
    dateVente?: Dayjs;
    maintenance?: number;
    contratMaintenance?: string;
    dateDebut?: Dayjs;
    dateFin?: Dayjs;
    etatApplication?: number;
    ecole?: IEcole;

}

export class Application implements IApplication {
    constructor(
        public id?: number,
        public nomApplication?: string,
        public versionApplication?: string,
        public logoApplication?: string,
        public coutApplication?: string,
        public dateVente?: Dayjs,
        public maintenance?: number,
        public contratMaintenance?: string,
        public dateDebut?: Dayjs,
        public dateFin?: Dayjs,
        public etatApplication?: number,
        public ecole?: IEcole,

    ) {}
}
