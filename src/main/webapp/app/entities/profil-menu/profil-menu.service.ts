import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProfilMenu } from 'app/shared/model/profil-menu.model';

type EntityResponseType = HttpResponse<IProfilMenu>;
type EntityArrayResponseType = HttpResponse<IProfilMenu[]>;

@Injectable({ providedIn: 'root' })
export class ProfilMenuService {
    public resourceUrl = SERVER_API_URL + 'api/profil-menus';
    public resourceprofilMenuAll = SERVER_API_URL + 'api/profilMenuAll';

    constructor(protected http: HttpClient) {}

    create(profilMenu: IProfilMenu): Observable<EntityResponseType> {
        return this.http.post<IProfilMenu>(this.resourceUrl, profilMenu, { observe: 'response' });
    }

    update(profilMenu: IProfilMenu): Observable<EntityResponseType> {
        return this.http.put<IProfilMenu>(this.resourceUrl, profilMenu, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProfilMenu>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProfilMenu[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    profilMenuAll(id: number): Observable<any> {
        return this.http.get<any>(`${this.resourceprofilMenuAll}/${id}`, { observe: 'response' });
    }

}
