import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProfilModule } from 'app/shared/model/profil-module.model';

type EntityResponseType = HttpResponse<IProfilModule>;
type EntityArrayResponseType = HttpResponse<IProfilModule[]>;

@Injectable({ providedIn: 'root' })
export class ProfilModuleService {
    public resourceUrl = SERVER_API_URL + 'api/profil-modules';
    public resourceprofilModuleAll = SERVER_API_URL + 'api/profilModuleAll';

    public resourceprofilModuleAllX = SERVER_API_URL + 'api/profilModuleAllX';

    constructor(protected http: HttpClient) {}

    create(profilModule: IProfilModule): Observable<EntityResponseType> {
        return this.http.post<IProfilModule>(this.resourceUrl, profilModule, { observe: 'response' });
    }

    update(profilModule: IProfilModule): Observable<EntityResponseType> {
        return this.http.put<IProfilModule>(this.resourceUrl, profilModule, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProfilModule>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProfilModule[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    profilModuleAll(id: number): Observable<any> {
        return this.http.get<any>(`${this.resourceprofilModuleAll}/${id}`, { observe: 'response' });
    }
    profilModuleAllX(id,id1): Observable<any> {
        return this.http.get<any>(`${this.resourceprofilModuleAllX}/${id}/${id1}`, { observe: 'response' });
    }


}
