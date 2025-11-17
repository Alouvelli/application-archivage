import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IApplication } from 'app/shared/model/application.model';
import { IEcole } from 'app/shared/model/ecole.model';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

export type EntityResponseType = HttpResponse<IApplication>;
export type EntityArrayResponseType = HttpResponse<IApplication[]>;

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  public resourceUrl = `${SERVER_API_URL}api/applications`;
  public resourceAllAppli = `${SERVER_API_URL}api/allApplication`;
  public resourceAllEcole = `${SERVER_API_URL}api/allEcole`;

  constructor(private readonly http: HttpClient) {}

  create(application: IApplication): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(application);
    return this.http
      .post<IApplication>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertDateFromServer(res)));
  }

  update(application: IApplication): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(application);
    return this.http
      .put<IApplication>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IApplication>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertDateFromServer(res)));
  }

  allApplication(): Observable<EntityArrayResponseType> {
    return this.http
      .get<IApplication[]>(this.resourceAllAppli, { observe: 'response' })
      .pipe(map(res => this.convertDateArrayFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IApplication[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  allEcole(): Observable<HttpResponse<IEcole[]>> {
    return this.http.get<IEcole[]>(this.resourceAllEcole, { observe: 'response' });
  }

  protected convertDateFromClient(application: IApplication): IApplication {
    return {
      ...application,
      dateVente: application.dateVente ? dayjs(application.dateVente).format(DATE_FORMAT) : null,
      dateDebut: application.dateDebut ? dayjs(application.dateDebut).format(DATE_FORMAT) : null,
      dateFin: application.dateFin ? dayjs(application.dateFin).format(DATE_FORMAT) : null
    };
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateVente = res.body.dateVente ? dayjs(res.body.dateVente) : undefined;
      res.body.dateDebut = res.body.dateDebut ? dayjs(res.body.dateDebut) : undefined;
      res.body.dateFin = res.body.dateFin ? dayjs(res.body.dateFin) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body = res.body.map(application => ({
        ...application,
        dateVente: application.dateVente ? dayjs(application.dateVente) : undefined,
        dateDebut: application.dateDebut ? dayjs(application.dateDebut) : undefined,
        dateFin: application.dateFin ? dayjs(application.dateFin) : undefined
      }));
    }
    return res;
  }
}
