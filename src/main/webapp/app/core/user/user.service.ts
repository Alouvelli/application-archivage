import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import {IUser, User} from './user.model';
import {Employe} from "../../shared/model/employe.model";

@Injectable({ providedIn: 'root' })
export class UserService {
    public resourceUrl = SERVER_API_URL + 'api/users';
    public resourceMaxId = SERVER_API_URL + 'api/maxIdUser';
    public resourcegetEmploye = SERVER_API_URL + 'api/getEmploye';
    public resourcegetAllProfil = SERVER_API_URL + 'api/getAllProfil';
    public resourcegetEmployeByLogin = SERVER_API_URL + 'api/getEmployeByLogin';
    public resourcegetsiteProfilX = SERVER_API_URL + 'api/getsiteProfilX';
    public resourcegetProfilModuleX = SERVER_API_URL + 'api/getProfilModuleX';
    public resourcegetProfilRubriqueX = SERVER_API_URL + 'api/getProfilRubriqueX';
    public resourcegetProfilMenuX= SERVER_API_URL + 'api/getProfilMenuX';

    constructor(private http: HttpClient) {}

    create(user: IUser): Observable<HttpResponse<IUser>> {
        return this.http.post<IUser>(this.resourceUrl, user, { observe: 'response' });
    }

    update(user: IUser): Observable<HttpResponse<IUser>> {
        return this.http.put<IUser>(this.resourceUrl, user, { observe: 'response' });
    }

    find(login: string): Observable<HttpResponse<IUser>> {
        return this.http.get<IUser>(`${this.resourceUrl}/${login}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<IUser[]>> {
        const options = createRequestOption(req);
        return this.http.get<IUser[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(login: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${login}`, { observe: 'response' });
    }

    authorities(): Observable<string[]> {
        return this.http.get<string[]>(SERVER_API_URL + 'api/users/authorities');
    }

    findMaxId(): Observable<User> {
        return this.http.get<User>(`${this.resourceMaxId}`, { observe: 'response' });
    }
    getAllProfil(): Observable<any> {
        return this.http.get<any>(`${this.resourcegetAllProfil}`, { observe: 'response' });
    }


    getEmploye(a): Observable<Employe> {
        return this.http.get<Employe>(`${this.resourcegetEmploye}/${a}`, { observe: 'response' });
    }


    getEmployeByLogin(a): Observable<Employe> {
        return this.http.get<Employe>(`${this.resourcegetEmployeByLogin}/${a}`, { observe: 'response' });
    }


    siteProfilX(a): Observable<any> {
        return this.http.get<any>(`${this.resourcegetsiteProfilX}/${a}`, { observe: 'response' });
    }
    profilModuleX(a): Observable<any> {
        return this.http.get<any>(`${this.resourcegetProfilModuleX}/${a}`, { observe: 'response' });
    }
    profilRubriqueX(a): Observable<any> {
        return this.http.get<any>(`${this.resourcegetProfilRubriqueX}/${a}`, { observe: 'response' });
    }
    profilMenuX(a): Observable<any> {
        return this.http.get<any>(`${this.resourcegetProfilMenuX}/${a}`, { observe: 'response' });
    }

}
