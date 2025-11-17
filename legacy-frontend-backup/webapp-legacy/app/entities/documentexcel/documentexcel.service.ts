import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDocumentexcel } from 'app/shared/model/documentexcel.model';

type EntityResponseType = HttpResponse<IDocumentexcel>;
type EntityArrayResponseType = HttpResponse<IDocumentexcel[]>;

@Injectable({ providedIn: 'root' })
export class DocumentexcelService {
    public resourceUrl = SERVER_API_URL + 'api/documentexcels';

    constructor(protected http: HttpClient) {}

    create(documentexcel: IDocumentexcel): Observable<EntityResponseType> {
        return this.http.post<IDocumentexcel>(this.resourceUrl, documentexcel, { observe: 'response' });
    }

    update(documentexcel: IDocumentexcel): Observable<EntityResponseType> {
        return this.http.put<IDocumentexcel>(this.resourceUrl, documentexcel, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDocumentexcel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDocumentexcel[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
