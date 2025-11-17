import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITypeDocument } from 'app/shared/model/type-document.model';

export type EntityResponseType = HttpResponse<ITypeDocument>;
export type EntityArrayResponseType = HttpResponse<ITypeDocument[]>;

@Injectable({ providedIn: 'root' })
export class TypeDocumentService {
    public resourceUrl = `${SERVER_API_URL}api/type-documents`;
    public resourceTypeDocument = `${SERVER_API_URL}api/typeDocument`;

    constructor(private http: HttpClient) {}

    create(typeDocument: ITypeDocument): Observable<EntityResponseType> {
        return this.http.post<ITypeDocument>(this.resourceUrl, typeDocument, { observe: 'response' });
    }

    update(typeDocument: ITypeDocument): Observable<EntityResponseType> {
        return this.http.put<ITypeDocument>(this.resourceUrl, typeDocument, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITypeDocument>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    typeDocument(id: number): Observable<EntityArrayResponseType> {
        return this.http.get<ITypeDocument[]>(`${this.resourceTypeDocument}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITypeDocument[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<{}>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
