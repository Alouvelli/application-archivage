import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProfil } from 'app/shared/model/profil.model';

type EntityResponseType = HttpResponse<IProfil>;
type EntityArrayResponseType = HttpResponse<IProfil[]>;

@Injectable({ providedIn: 'root' })
export class ProfilService {
    public resourceUrl = SERVER_API_URL + 'api/profils';
    public resourcemenu = SERVER_API_URL + 'api/allMenu';
    public resourcerubrique = SERVER_API_URL + 'api/allRubrique';
    public resourcemodule = SERVER_API_URL + 'api/allModule';
    public resourceMaxProfil = SERVER_API_URL + 'api/maxProfil';
    public resourcegetModule = SERVER_API_URL + 'api/getModule';
    public resourcemaxSiteProfil = SERVER_API_URL +'api/maxSiteProfil';
    public resourcemaxProfilModule = SERVER_API_URL +'api/maxProfilModule';
    public resourcemaxProfilRubrique= SERVER_API_URL +'api/maxProfilRubrique';
    public resourceprofilmenusall= SERVER_API_URL +'api/profil-menus-all';
    public resourcesiteall= SERVER_API_URL +'api/site-all';
    public resourcegetallsite= SERVER_API_URL +'api/getallsite';
    public resourcegetallModuleX= SERVER_API_URL +'api/getallModuleX';
    public resourcegetallRubriqueX= SERVER_API_URL +'api/getallRubriqueX';
    public resourcegetallMenuX= SERVER_API_URL +'api/getallMenuX';


    constructor(protected http: HttpClient) {}

    create(profil: IProfil): Observable<EntityResponseType> {
        return this.http.post<IProfil>(this.resourceUrl, profil, { observe: 'response' });
    }

    update(profil: IProfil): Observable<EntityResponseType> {
        return this.http.put<IProfil>(this.resourceUrl, profil, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProfil>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProfil[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    allmodule(): Observable<any> {
        return this.http.get<any>(`${this.resourcemodule}`, { observe: 'response' });
    }
    allmenu(): Observable<any> {
        return this.http.get<any>(`${this.resourcemenu}`, { observe: 'response' });
    }
    allrubrique(): Observable<any> {
        return this.http.get<any>(`${this.resourcerubrique}`, { observe: 'response' });
    }
    maxProfil(): Observable<any> {
        return this.http.get<any>(`${this.resourceMaxProfil}`, { observe: 'response' });
    }
    maxSiteProfil(id): Observable<any> {
        return this.http.get<any>(`${this.resourcemaxSiteProfil}/${id}`, { observe: 'response' });
    }
    maxModuleProfil(id,id1): Observable<any> {
        return this.http.get<any>(`${this.resourcemaxProfilModule}/${id}/${id1}`, { observe: 'response' });
    }
    maxRubriqueProfil(id,mod): Observable<any> {
        return this.http.get<any>(`${this.resourcemaxProfilRubrique}/${id}/${mod}`, { observe: 'response' });
    }


    getModule(id: number): Observable<any> {
        return this.http.get<any>(`${this.resourcegetModule}/${id}`, { observe: 'response' });
    }


    siteprofilsall(id): Observable<any> {
        return this.http.get<any>(`${this.resourcesiteall}/${id}`, { observe: 'response' });
    }

   getallModuleX(id): Observable<any> {
        return this.http.get<any>(`${this.resourcegetallModuleX}/${id}`, { observe: 'response' });
    }

    getallRubriqueX(id): Observable<any> {
        return this.http.get<any>(`${this.resourcegetallRubriqueX}/${id}`, { observe: 'response' });
    }
    getallMenuX(id): Observable<any> {
        return this.http.get<any>(`${this.resourcegetallMenuX}/${id}`, { observe: 'response' });
    }

}
