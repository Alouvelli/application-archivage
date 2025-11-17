import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDocumentclasse, NewDocumentclasse } from '../documentclasse.model';

export type PartialUpdateDocumentclasse = Partial<IDocumentclasse> & Pick<IDocumentclasse, 'id'>;

export type EntityResponseType = HttpResponse<IDocumentclasse>;
export type EntityArrayResponseType = HttpResponse<IDocumentclasse[]>;

@Injectable({ providedIn: 'root' })
export class DocumentclasseService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/documentclasses');

  create(documentclasse: NewDocumentclasse): Observable<EntityResponseType> {
    return this.http.post<IDocumentclasse>(this.resourceUrl, documentclasse, { observe: 'response' });
  }

  update(documentclasse: IDocumentclasse): Observable<EntityResponseType> {
    return this.http.put<IDocumentclasse>(`${this.resourceUrl}/${this.getDocumentclasseIdentifier(documentclasse)}`, documentclasse, {
      observe: 'response',
    });
  }

  partialUpdate(documentclasse: PartialUpdateDocumentclasse): Observable<EntityResponseType> {
    return this.http.patch<IDocumentclasse>(`${this.resourceUrl}/${this.getDocumentclasseIdentifier(documentclasse)}`, documentclasse, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDocumentclasse>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDocumentclasse[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDocumentclasseIdentifier(documentclasse: Pick<IDocumentclasse, 'id'>): number {
    return documentclasse.id;
  }

  compareDocumentclasse(o1: Pick<IDocumentclasse, 'id'> | null, o2: Pick<IDocumentclasse, 'id'> | null): boolean {
    return o1 && o2 ? this.getDocumentclasseIdentifier(o1) === this.getDocumentclasseIdentifier(o2) : o1 === o2;
  }

  addDocumentclasseToCollectionIfMissing<Type extends Pick<IDocumentclasse, 'id'>>(
    documentclasseCollection: Type[],
    ...documentclassesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const documentclasses: Type[] = documentclassesToCheck.filter(isPresent);
    if (documentclasses.length > 0) {
      const documentclasseCollectionIdentifiers = documentclasseCollection.map(documentclasseItem =>
        this.getDocumentclasseIdentifier(documentclasseItem),
      );
      const documentclassesToAdd = documentclasses.filter(documentclasseItem => {
        const documentclasseIdentifier = this.getDocumentclasseIdentifier(documentclasseItem);
        if (documentclasseCollectionIdentifiers.includes(documentclasseIdentifier)) {
          return false;
        }
        documentclasseCollectionIdentifiers.push(documentclasseIdentifier);
        return true;
      });
      return [...documentclassesToAdd, ...documentclasseCollection];
    }
    return documentclasseCollection;
  }
}
