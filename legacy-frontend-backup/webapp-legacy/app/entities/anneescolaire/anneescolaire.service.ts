import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAnneescolaire } from 'app/shared/model/anneescolaire.model';

type EntityResponseType = HttpResponse<IAnneescolaire>;
type EntityArrayResponseType = HttpResponse<IAnneescolaire[]>;

@Injectable({ providedIn: 'root' })
export class AnneescolaireService {
    public resourceUrl = SERVER_API_URL + 'api/anneescolaires';

    constructor(protected http: HttpClient) {}

    create(anneescolaire: IAnneescolaire): Observable<EntityResponseType> {
        return this.http.post<IAnneescolaire>(this.resourceUrl, anneescolaire, { observe: 'response' });
    }

    update(anneescolaire: IAnneescolaire): Observable<EntityResponseType> {
        return this.http.put<IAnneescolaire>(this.resourceUrl, anneescolaire, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAnneescolaire>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAnneescolaire[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
