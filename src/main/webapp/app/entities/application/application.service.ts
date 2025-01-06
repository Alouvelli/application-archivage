import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IApplication } from 'app/shared/model/application.model';
import {IEcole} from "../../shared/model/ecole.model";

type EntityResponseType = HttpResponse<IApplication>;
type EntityArrayResponseType = HttpResponse<IApplication[]>;

@Injectable({ providedIn: 'root' })
export class ApplicationService {
    public resourceUrl = SERVER_API_URL + 'api/applications';
    public resourceAllAppli = SERVER_API_URL + 'api/allApplication';
    public resourceAllEcole = SERVER_API_URL + 'api//allEcole';


    constructor(protected http: HttpClient) {}

    create(application: IApplication): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(application);
        return this.http
            .post<IApplication>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(application: IApplication): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(application);
        return this.http
            .put<IApplication>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IApplication>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    allApplication(): Observable<EntityResponseType> {
        return this.http
            .get<IApplication>(`${this.resourceAllAppli}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateArrayFromServer(res)));
    }
    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IApplication[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(application: IApplication): IApplication {
        const copy: IApplication = Object.assign({}, application, {
            dateVente: application.dateVente != null && application.dateVente.isValid() ? application.dateVente.format(DATE_FORMAT) : null,
            dateDebut: application.dateDebut != null && application.dateDebut.isValid() ? application.dateDebut.format(DATE_FORMAT) : null,
            dateFin: application.dateFin != null && application.dateFin.isValid() ? application.dateFin.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dateVente = res.body.dateVente != null ? moment(res.body.dateVente) : null;
            res.body.dateDebut = res.body.dateDebut != null ? moment(res.body.dateDebut) : null;
            res.body.dateFin = res.body.dateFin != null ? moment(res.body.dateFin) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((application: IApplication) => {
                application.dateVente = application.dateVente != null ? moment(application.dateVente) : null;
                application.dateDebut = application.dateDebut != null ? moment(application.dateDebut) : null;
                application.dateFin = application.dateFin != null ? moment(application.dateFin) : null;
            });
        }
        return res;
    }

    allEcole(): Observable<EntityResponseType> {
        return this.http
            .get<IEcole>(`${this.resourceAllEcole}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

}
