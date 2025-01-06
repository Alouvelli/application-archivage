import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEmploye } from 'app/shared/model/employe.model';

type EntityResponseType = HttpResponse<IEmploye>;
type EntityArrayResponseType = HttpResponse<IEmploye[]>;

@Injectable({ providedIn: 'root' })
export class EmployeService {
    public resourceUrl = SERVER_API_URL + 'api/employes';
    public resourceallUser = SERVER_API_URL + 'api/allUser';

    constructor(protected http: HttpClient) {}

    create(employe: IEmploye): Observable<EntityResponseType> {
        return this.http.post<IEmploye>(this.resourceUrl, employe, { observe: 'response' });
    }

    update(employe: IEmploye): Observable<EntityResponseType> {
        return this.http.put<IEmploye>(this.resourceUrl, employe, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEmploye>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEmploye[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    allUser(): Observable<any> {
        return this.http.get<any>(`${this.resourceallUser}`, { observe: 'response' });
    }
}
