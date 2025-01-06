import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IClasse } from 'app/shared/model/classe.model';

type EntityResponseType = HttpResponse<IClasse>;
type EntityArrayResponseType = HttpResponse<IClasse[]>;

@Injectable({ providedIn: 'root' })
export class ClasseService {
    public resourceUrl = SERVER_API_URL + 'api/classes';
    public resourceallClasse = SERVER_API_URL + 'api/allClasse';
    public resourceindclasseById = SERVER_API_URL + 'api/findclasseById';


    constructor(protected http: HttpClient) {}

    create(classe: IClasse): Observable<EntityResponseType> {
        return this.http.post<IClasse>(this.resourceUrl, classe, { observe: 'response' });
    }

    update(classe: IClasse): Observable<EntityResponseType> {
        return this.http.put<IClasse>(this.resourceUrl, classe, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IClasse>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IClasse[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    allClasse(): Observable<any> {
        return this.http.get<any>(`${this.resourceallClasse}`, { observe: 'response' });
    }

    findclasseById(id: number): Observable<any> {
        return this.http.get<any>(`${this.resourceindclasseById}/${id}`, { observe: 'response' });
    }

}
