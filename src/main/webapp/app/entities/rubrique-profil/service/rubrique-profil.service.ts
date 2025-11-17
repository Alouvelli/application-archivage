import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRubriqueProfil, NewRubriqueProfil } from '../rubrique-profil.model';

export type PartialUpdateRubriqueProfil = Partial<IRubriqueProfil> & Pick<IRubriqueProfil, 'id'>;

export type EntityResponseType = HttpResponse<IRubriqueProfil>;
export type EntityArrayResponseType = HttpResponse<IRubriqueProfil[]>;

@Injectable({ providedIn: 'root' })
export class RubriqueProfilService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/rubrique-profils');

  create(rubriqueProfil: NewRubriqueProfil): Observable<EntityResponseType> {
    return this.http.post<IRubriqueProfil>(this.resourceUrl, rubriqueProfil, { observe: 'response' });
  }

  update(rubriqueProfil: IRubriqueProfil): Observable<EntityResponseType> {
    return this.http.put<IRubriqueProfil>(`${this.resourceUrl}/${this.getRubriqueProfilIdentifier(rubriqueProfil)}`, rubriqueProfil, {
      observe: 'response',
    });
  }

  partialUpdate(rubriqueProfil: PartialUpdateRubriqueProfil): Observable<EntityResponseType> {
    return this.http.patch<IRubriqueProfil>(`${this.resourceUrl}/${this.getRubriqueProfilIdentifier(rubriqueProfil)}`, rubriqueProfil, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRubriqueProfil>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRubriqueProfil[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getRubriqueProfilIdentifier(rubriqueProfil: Pick<IRubriqueProfil, 'id'>): number {
    return rubriqueProfil.id;
  }

  compareRubriqueProfil(o1: Pick<IRubriqueProfil, 'id'> | null, o2: Pick<IRubriqueProfil, 'id'> | null): boolean {
    return o1 && o2 ? this.getRubriqueProfilIdentifier(o1) === this.getRubriqueProfilIdentifier(o2) : o1 === o2;
  }

  addRubriqueProfilToCollectionIfMissing<Type extends Pick<IRubriqueProfil, 'id'>>(
    rubriqueProfilCollection: Type[],
    ...rubriqueProfilsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const rubriqueProfils: Type[] = rubriqueProfilsToCheck.filter(isPresent);
    if (rubriqueProfils.length > 0) {
      const rubriqueProfilCollectionIdentifiers = rubriqueProfilCollection.map(rubriqueProfilItem =>
        this.getRubriqueProfilIdentifier(rubriqueProfilItem),
      );
      const rubriqueProfilsToAdd = rubriqueProfils.filter(rubriqueProfilItem => {
        const rubriqueProfilIdentifier = this.getRubriqueProfilIdentifier(rubriqueProfilItem);
        if (rubriqueProfilCollectionIdentifiers.includes(rubriqueProfilIdentifier)) {
          return false;
        }
        rubriqueProfilCollectionIdentifiers.push(rubriqueProfilIdentifier);
        return true;
      });
      return [...rubriqueProfilsToAdd, ...rubriqueProfilCollection];
    }
    return rubriqueProfilCollection;
  }
}
