import { ITypeDocument } from 'app/shared/model/type-document.model';

export interface IDocument {
    id?: number;
    etat?: boolean;
    document1ContentType?: string;
    document1?: any;
    document2?: any;
    ref?: number;
    typeDocument?: ITypeDocument;
}

export class Document implements IDocument {
    constructor(
        public id?: number,
        public etat?: boolean,
        public document1ContentType?: string,
        public document1?: any,
        public document2?: any,
        public ref?: number,
        public typeDocument?: ITypeDocument
    ) {
        this.etat = this.etat || false;
    }
}
