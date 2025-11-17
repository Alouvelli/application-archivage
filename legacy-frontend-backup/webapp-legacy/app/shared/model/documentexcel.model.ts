export interface IDocumentexcel {
    id?: number;
    excelContentType?: string;
    excel?: any;
}

export class Documentexcel implements IDocumentexcel {
    constructor(public id?: number, public excelContentType?: string, public excel?: any) {}
}
