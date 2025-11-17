import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEtudiant } from 'app/shared/model/etudiant.model';

type EntityResponseType = HttpResponse<IEtudiant>;
type EntityArrayResponseType = HttpResponse<IEtudiant[]>;

@Injectable({ providedIn: 'root' })
export class EtudiantService {
    public resourceUrl = SERVER_API_URL + 'api/etudiants';


    public resourcemaxEtudiant = SERVER_API_URL + 'api/maxEtudiant';
    public resourcemaxEtudiant2 = SERVER_API_URL + 'api/maxEtudiant2';

    constructor(protected http: HttpClient) {}

    create(etudiant: IEtudiant): Observable<EntityResponseType> {
        return this.http.post<IEtudiant>(this.resourceUrl, etudiant, { observe: 'response' });
    }

    update(etudiant: IEtudiant): Observable<EntityResponseType> {
        return this.http.put<IEtudiant>(this.resourceUrl, etudiant, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEtudiant>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEtudiant[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }



    maxEtudiant(): Observable<any> {
        return this.http.get<any>(`${this.resourcemaxEtudiant}`, { observe: 'response' });
    }


    /* allEtudiant(): Observable<any> {
         return this.http.get<any>(`${this.resourceallEtudiant}`, { observe: 'response' });
     }*/
    maxEtudiant2(id): Observable<any> {
        return this.http.get<any>(`${this.resourcemaxEtudiant2}/${id}`, { observe: 'response' });
    }


}
