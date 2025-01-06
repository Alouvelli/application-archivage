import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRubriqueProfil } from 'app/shared/model/rubrique-profil.model';

type EntityResponseType = HttpResponse<IRubriqueProfil>;
type EntityArrayResponseType = HttpResponse<IRubriqueProfil[]>;

@Injectable({ providedIn: 'root' })
export class RubriqueProfilService {
    public resourceUrl = SERVER_API_URL + 'api/rubrique-profils';
    public resourceprofilRubriqueAll = SERVER_API_URL + 'api/profilRubriqueAll';
    public resourceprofilRubriqueAllX = SERVER_API_URL + 'api/profilRubriqueAllX';

    constructor(protected http: HttpClient) {}

    create(rubriqueProfil: IRubriqueProfil): Observable<EntityResponseType> {
        return this.http.post<IRubriqueProfil>(this.resourceUrl, rubriqueProfil, { observe: 'response' });
    }

    update(rubriqueProfil: IRubriqueProfil): Observable<EntityResponseType> {
        return this.http.put<IRubriqueProfil>(this.resourceUrl, rubriqueProfil, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRubriqueProfil>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRubriqueProfil[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    profilRubriqueAll(id: number): Observable<any> {
        return this.http.get<any>(`${this.resourceprofilRubriqueAll}/${id}`, { observe: 'response' });
    }
    profilRubriqueAllX(id,id1): Observable<any> {
        return this.http.get<any>(`${this.resourceprofilRubriqueAllX}/${id}/${id1}`, { observe: 'response' });
    }


}
