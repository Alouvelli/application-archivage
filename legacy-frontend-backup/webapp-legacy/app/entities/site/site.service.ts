import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISite } from 'app/shared/model/site.model';
import { IModule } from 'app/shared/model/module.model';

export type EntityResponseType = HttpResponse<ISite>;
export type EntityArrayResponseType = HttpResponse<ISite[]>;
export type ModuleArrayResponseType = HttpResponse<IModule[]>;

@Injectable({ providedIn: 'root' })
export class SiteService {
  public resourceUrl = `${SERVER_API_URL}api/sites`;
  public resourceGetModule = `${SERVER_API_URL}api/getModule`;
  public resourceGetAllSite = `${SERVER_API_URL}api/getallsite`;

  constructor(private readonly http: HttpClient) {}

  create(site: ISite): Observable<EntityResponseType> {
    return this.http.post<ISite>(this.resourceUrl, site, { observe: 'response' });
  }

  update(site: ISite): Observable<EntityResponseType> {
    return this.http.put<ISite>(this.resourceUrl, site, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISite>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISite[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getModule(id: number): Observable<ModuleArrayResponseType> {
    return this.http.get<IModule[]>(`${this.resourceGetModule}/${id}`, { observe: 'response' });
  }

  getallsite(): Observable<EntityArrayResponseType> {
    return this.http.get<ISite[]>(this.resourceGetAllSite, { observe: 'response' });
  }
}
