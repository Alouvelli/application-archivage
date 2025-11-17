import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISiteProfil } from 'app/shared/model/site-profil.model';

type EntityResponseType = HttpResponse<ISiteProfil>;
type EntityArrayResponseType = HttpResponse<ISiteProfil[]>;

@Injectable({ providedIn: 'root' })
export class SiteProfilService {
    public resourceUrl = SERVER_API_URL + 'api/site-profils';
    public resourceprofilSiteAll = SERVER_API_URL + 'api/profilSiteAll';

    constructor(protected http: HttpClient) {}

    create(siteProfil: ISiteProfil): Observable<EntityResponseType> {
        return this.http.post<ISiteProfil>(this.resourceUrl, siteProfil, { observe: 'response' });
    }

    update(siteProfil: ISiteProfil): Observable<EntityResponseType> {
        return this.http.put<ISiteProfil>(this.resourceUrl, siteProfil, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISiteProfil>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISiteProfil[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<{}>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    profilSiteAll(id: number, id1: number): Observable<EntityResponseType> {
        return this.http.get<ISiteProfil>(`${this.resourceprofilSiteAll}/${id}/${id1}`, { observe: 'response' });
    }

}
