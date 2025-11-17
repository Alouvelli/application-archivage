import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAnneescolaire, NewAnneescolaire } from '../anneescolaire.model';

export type PartialUpdateAnneescolaire = Partial<IAnneescolaire> & Pick<IAnneescolaire, 'id'>;

export type EntityResponseType = HttpResponse<IAnneescolaire>;
export type EntityArrayResponseType = HttpResponse<IAnneescolaire[]>;

@Injectable({ providedIn: 'root' })
export class AnneescolaireService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/anneescolaires');

  create(anneescolaire: NewAnneescolaire): Observable<EntityResponseType> {
    return this.http.post<IAnneescolaire>(this.resourceUrl, anneescolaire, { observe: 'response' });
  }

  update(anneescolaire: IAnneescolaire): Observable<EntityResponseType> {
    return this.http.put<IAnneescolaire>(`${this.resourceUrl}/${this.getAnneescolaireIdentifier(anneescolaire)}`, anneescolaire, {
      observe: 'response',
    });
  }

  partialUpdate(anneescolaire: PartialUpdateAnneescolaire): Observable<EntityResponseType> {
    return this.http.patch<IAnneescolaire>(`${this.resourceUrl}/${this.getAnneescolaireIdentifier(anneescolaire)}`, anneescolaire, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAnneescolaire>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAnneescolaire[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAnneescolaireIdentifier(anneescolaire: Pick<IAnneescolaire, 'id'>): number {
    return anneescolaire.id;
  }

  compareAnneescolaire(o1: Pick<IAnneescolaire, 'id'> | null, o2: Pick<IAnneescolaire, 'id'> | null): boolean {
    return o1 && o2 ? this.getAnneescolaireIdentifier(o1) === this.getAnneescolaireIdentifier(o2) : o1 === o2;
  }

  addAnneescolaireToCollectionIfMissing<Type extends Pick<IAnneescolaire, 'id'>>(
    anneescolaireCollection: Type[],
    ...anneescolairesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const anneescolaires: Type[] = anneescolairesToCheck.filter(isPresent);
    if (anneescolaires.length > 0) {
      const anneescolaireCollectionIdentifiers = anneescolaireCollection.map(anneescolaireItem =>
        this.getAnneescolaireIdentifier(anneescolaireItem),
      );
      const anneescolairesToAdd = anneescolaires.filter(anneescolaireItem => {
        const anneescolaireIdentifier = this.getAnneescolaireIdentifier(anneescolaireItem);
        if (anneescolaireCollectionIdentifiers.includes(anneescolaireIdentifier)) {
          return false;
        }
        anneescolaireCollectionIdentifiers.push(anneescolaireIdentifier);
        return true;
      });
      return [...anneescolairesToAdd, ...anneescolaireCollection];
    }
    return anneescolaireCollection;
  }
}
