import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDocumentclasse } from 'app/shared/model/documentclasse.model';

type EntityResponseType = HttpResponse<IDocumentclasse>;
type EntityArrayResponseType = HttpResponse<IDocumentclasse[]>;

@Injectable({ providedIn: 'root' })
export class DocumentclasseService {
    public resourceUrl = SERVER_API_URL + 'api/documentclasses';

    constructor(protected http: HttpClient) {}

    create(documentclasse: IDocumentclasse): Observable<EntityResponseType> {
        return this.http.post<IDocumentclasse>(this.resourceUrl, documentclasse, { observe: 'response' });
    }

    update(documentclasse: IDocumentclasse): Observable<EntityResponseType> {
        return this.http.put<IDocumentclasse>(this.resourceUrl, documentclasse, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDocumentclasse>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDocumentclasse[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
