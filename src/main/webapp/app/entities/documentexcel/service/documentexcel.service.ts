import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDocumentexcel, NewDocumentexcel } from '../documentexcel.model';

export type PartialUpdateDocumentexcel = Partial<IDocumentexcel> & Pick<IDocumentexcel, 'id'>;

export type EntityResponseType = HttpResponse<IDocumentexcel>;
export type EntityArrayResponseType = HttpResponse<IDocumentexcel[]>;

@Injectable({ providedIn: 'root' })
export class DocumentexcelService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/documentexcels');

  create(documentexcel: NewDocumentexcel): Observable<EntityResponseType> {
    return this.http.post<IDocumentexcel>(this.resourceUrl, documentexcel, { observe: 'response' });
  }

  update(documentexcel: IDocumentexcel): Observable<EntityResponseType> {
    return this.http.put<IDocumentexcel>(`${this.resourceUrl}/${this.getDocumentexcelIdentifier(documentexcel)}`, documentexcel, {
      observe: 'response',
    });
  }

  partialUpdate(documentexcel: PartialUpdateDocumentexcel): Observable<EntityResponseType> {
    return this.http.patch<IDocumentexcel>(`${this.resourceUrl}/${this.getDocumentexcelIdentifier(documentexcel)}`, documentexcel, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDocumentexcel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDocumentexcel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDocumentexcelIdentifier(documentexcel: Pick<IDocumentexcel, 'id'>): number {
    return documentexcel.id;
  }

  compareDocumentexcel(o1: Pick<IDocumentexcel, 'id'> | null, o2: Pick<IDocumentexcel, 'id'> | null): boolean {
    return o1 && o2 ? this.getDocumentexcelIdentifier(o1) === this.getDocumentexcelIdentifier(o2) : o1 === o2;
  }

  addDocumentexcelToCollectionIfMissing<Type extends Pick<IDocumentexcel, 'id'>>(
    documentexcelCollection: Type[],
    ...documentexcelsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const documentexcels: Type[] = documentexcelsToCheck.filter(isPresent);
    if (documentexcels.length > 0) {
      const documentexcelCollectionIdentifiers = documentexcelCollection.map(documentexcelItem =>
        this.getDocumentexcelIdentifier(documentexcelItem),
      );
      const documentexcelsToAdd = documentexcels.filter(documentexcelItem => {
        const documentexcelIdentifier = this.getDocumentexcelIdentifier(documentexcelItem);
        if (documentexcelCollectionIdentifiers.includes(documentexcelIdentifier)) {
          return false;
        }
        documentexcelCollectionIdentifiers.push(documentexcelIdentifier);
        return true;
      });
      return [...documentexcelsToAdd, ...documentexcelCollection];
    }
    return documentexcelCollection;
  }
}
