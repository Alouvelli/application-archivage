import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEmploye } from 'app/shared/model/employe.model';
import { IUser } from 'app/core/user/user.model';

export type EntityResponseType = HttpResponse<IEmploye>;
export type EntityArrayResponseType = HttpResponse<IEmploye[]>;

@Injectable({ providedIn: 'root' })
export class EmployeService {
  public resourceUrl = `${SERVER_API_URL}api/employes`;
  public resourceAllUserUrl = `${SERVER_API_URL}api/allUser`;

  constructor(private readonly http: HttpClient) {}

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

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  allUser(): Observable<HttpResponse<IUser[]>> {
    return this.http.get<IUser[]>(this.resourceAllUserUrl, { observe: 'response' });
  }
}
