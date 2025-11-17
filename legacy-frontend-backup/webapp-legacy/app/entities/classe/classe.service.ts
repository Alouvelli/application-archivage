import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IClasse } from 'app/shared/model/classe.model';

export type EntityResponseType = HttpResponse<IClasse>;
export type EntityArrayResponseType = HttpResponse<IClasse[]>;

@Injectable({ providedIn: 'root' })
export class ClasseService {
  protected resourceUrl = `${SERVER_API_URL}api/classes`;
  protected resourceAllUrl = `${SERVER_API_URL}api/allClasse`;
  protected resourceFindUrl = `${SERVER_API_URL}api/findclasseById`;

  constructor(private readonly http: HttpClient) {}

  create(classe: IClasse): Observable<EntityResponseType> {
    return this.http.post<IClasse>(this.resourceUrl, classe, { observe: 'response' });
  }

  update(classe: IClasse): Observable<EntityResponseType> {
    return this.http.put<IClasse>(this.resourceUrl, classe, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IClasse>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IClasse[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  allClasse(): Observable<EntityArrayResponseType> {
    return this.http.get<IClasse[]>(this.resourceAllUrl, { observe: 'response' });
  }

  findClasseById(id: number): Observable<EntityResponseType> {
    return this.http.get<IClasse>(`${this.resourceFindUrl}/${id}`, { observe: 'response' });
  }
}
