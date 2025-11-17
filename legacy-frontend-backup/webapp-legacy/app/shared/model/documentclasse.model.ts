import { IClasse } from 'app/shared/model/classe.model';
import { ISemestre } from 'app/shared/model/semestre.model';

export interface IDocumentclasse {
    id?: number;
    document1ContentType?: string;
    document1?: any;
    ref?: string;
    nomdocument?: string;
    classe?: IClasse;
    semestre?: ISemestre;
}

export class Documentclasse implements IDocumentclasse {
    constructor(
        public id?: number,
        public document1ContentType?: string,
        public document1?: any,
        public ref?: string,
        public nomdocument?: string,
        public classe?: IClasse,
        public semestre?: ISemestre
    ) {}
}
