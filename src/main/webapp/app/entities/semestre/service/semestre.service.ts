import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISemestre, NewSemestre } from '../semestre.model';

export type PartialUpdateSemestre = Partial<ISemestre> & Pick<ISemestre, 'id'>;

export type EntityResponseType = HttpResponse<ISemestre>;
export type EntityArrayResponseType = HttpResponse<ISemestre[]>;

@Injectable({ providedIn: 'root' })
export class SemestreService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/semestres');

  create(semestre: NewSemestre): Observable<EntityResponseType> {
    return this.http.post<ISemestre>(this.resourceUrl, semestre, { observe: 'response' });
  }

  update(semestre: ISemestre): Observable<EntityResponseType> {
    return this.http.put<ISemestre>(`${this.resourceUrl}/${this.getSemestreIdentifier(semestre)}`, semestre, { observe: 'response' });
  }

  partialUpdate(semestre: PartialUpdateSemestre): Observable<EntityResponseType> {
    return this.http.patch<ISemestre>(`${this.resourceUrl}/${this.getSemestreIdentifier(semestre)}`, semestre, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISemestre>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISemestre[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSemestreIdentifier(semestre: Pick<ISemestre, 'id'>): number {
    return semestre.id;
  }

  compareSemestre(o1: Pick<ISemestre, 'id'> | null, o2: Pick<ISemestre, 'id'> | null): boolean {
    return o1 && o2 ? this.getSemestreIdentifier(o1) === this.getSemestreIdentifier(o2) : o1 === o2;
  }

  addSemestreToCollectionIfMissing<Type extends Pick<ISemestre, 'id'>>(
    semestreCollection: Type[],
    ...semestresToCheck: (Type | null | undefined)[]
  ): Type[] {
    const semestres: Type[] = semestresToCheck.filter(isPresent);
    if (semestres.length > 0) {
      const semestreCollectionIdentifiers = semestreCollection.map(semestreItem => this.getSemestreIdentifier(semestreItem));
      const semestresToAdd = semestres.filter(semestreItem => {
        const semestreIdentifier = this.getSemestreIdentifier(semestreItem);
        if (semestreCollectionIdentifiers.includes(semestreIdentifier)) {
          return false;
        }
        semestreCollectionIdentifiers.push(semestreIdentifier);
        return true;
      });
      return [...semestresToAdd, ...semestreCollection];
    }
    return semestreCollection;
  }
}
