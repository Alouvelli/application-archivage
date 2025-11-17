import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInscription } from 'app/shared/model/inscription.model';

type EntityResponseType = HttpResponse<IInscription>;
type EntityArrayResponseType = HttpResponse<IInscription[]>;

@Injectable({ providedIn: 'root' })
export class InscriptionService {

    public resourcegetAllInscription = SERVER_API_URL + 'api/getAllInscription';
    public resourceUrl = SERVER_API_URL + 'api/inscriptions';
    public resourcemaxInscription= SERVER_API_URL + 'api/maxInscription';

    constructor(protected http: HttpClient) {}

    create(inscription: IInscription): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(inscription);
        return this.http
            .post<IInscription>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(inscription: IInscription): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(inscription);
        return this.http
            .put<IInscription>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    getAllInscription(): Observable<any> {
        return this.http
            .get<any>(`${this.resourcegetAllInscription}`, { observe: 'response' });

    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IInscription>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }


    maxInscription(): Observable<any> {
        return this.http
            .get<any>(`${this.resourcemaxInscription}`, { observe: 'response' });

    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IInscription[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(inscription: IInscription): IInscription {
        const copy: IInscription = Object.assign({}, inscription, {
            date: inscription.date != null && inscription.date.isValid() ? inscription.date.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.date = res.body.date != null ? moment(res.body.date) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((inscription: IInscription) => {
                inscription.date = inscription.date != null ? moment(inscription.date) : null;
            });
        }
        return res;
    }
}
