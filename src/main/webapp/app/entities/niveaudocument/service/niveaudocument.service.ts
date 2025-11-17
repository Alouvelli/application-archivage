import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INiveaudocument, NewNiveaudocument } from '../niveaudocument.model';

export type PartialUpdateNiveaudocument = Partial<INiveaudocument> & Pick<INiveaudocument, 'id'>;

export type EntityResponseType = HttpResponse<INiveaudocument>;
export type EntityArrayResponseType = HttpResponse<INiveaudocument[]>;

@Injectable({ providedIn: 'root' })
export class NiveaudocumentService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/niveaudocuments');

  create(niveaudocument: NewNiveaudocument): Observable<EntityResponseType> {
    return this.http.post<INiveaudocument>(this.resourceUrl, niveaudocument, { observe: 'response' });
  }

  update(niveaudocument: INiveaudocument): Observable<EntityResponseType> {
    return this.http.put<INiveaudocument>(`${this.resourceUrl}/${this.getNiveaudocumentIdentifier(niveaudocument)}`, niveaudocument, {
      observe: 'response',
    });
  }

  partialUpdate(niveaudocument: PartialUpdateNiveaudocument): Observable<EntityResponseType> {
    return this.http.patch<INiveaudocument>(`${this.resourceUrl}/${this.getNiveaudocumentIdentifier(niveaudocument)}`, niveaudocument, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INiveaudocument>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INiveaudocument[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getNiveaudocumentIdentifier(niveaudocument: Pick<INiveaudocument, 'id'>): number {
    return niveaudocument.id;
  }

  compareNiveaudocument(o1: Pick<INiveaudocument, 'id'> | null, o2: Pick<INiveaudocument, 'id'> | null): boolean {
    return o1 && o2 ? this.getNiveaudocumentIdentifier(o1) === this.getNiveaudocumentIdentifier(o2) : o1 === o2;
  }

  addNiveaudocumentToCollectionIfMissing<Type extends Pick<INiveaudocument, 'id'>>(
    niveaudocumentCollection: Type[],
    ...niveaudocumentsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const niveaudocuments: Type[] = niveaudocumentsToCheck.filter(isPresent);
    if (niveaudocuments.length > 0) {
      const niveaudocumentCollectionIdentifiers = niveaudocumentCollection.map(niveaudocumentItem =>
        this.getNiveaudocumentIdentifier(niveaudocumentItem),
      );
      const niveaudocumentsToAdd = niveaudocuments.filter(niveaudocumentItem => {
        const niveaudocumentIdentifier = this.getNiveaudocumentIdentifier(niveaudocumentItem);
        if (niveaudocumentCollectionIdentifiers.includes(niveaudocumentIdentifier)) {
          return false;
        }
        niveaudocumentCollectionIdentifiers.push(niveaudocumentIdentifier);
        return true;
      });
      return [...niveaudocumentsToAdd, ...niveaudocumentCollection];
    }
    return niveaudocumentCollection;
  }
}
