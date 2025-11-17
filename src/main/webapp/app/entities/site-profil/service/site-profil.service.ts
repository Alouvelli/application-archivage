import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISiteProfil, NewSiteProfil } from '../site-profil.model';

export type PartialUpdateSiteProfil = Partial<ISiteProfil> & Pick<ISiteProfil, 'id'>;

export type EntityResponseType = HttpResponse<ISiteProfil>;
export type EntityArrayResponseType = HttpResponse<ISiteProfil[]>;

@Injectable({ providedIn: 'root' })
export class SiteProfilService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/site-profils');

  create(siteProfil: NewSiteProfil): Observable<EntityResponseType> {
    return this.http.post<ISiteProfil>(this.resourceUrl, siteProfil, { observe: 'response' });
  }

  update(siteProfil: ISiteProfil): Observable<EntityResponseType> {
    return this.http.put<ISiteProfil>(`${this.resourceUrl}/${this.getSiteProfilIdentifier(siteProfil)}`, siteProfil, {
      observe: 'response',
    });
  }

  partialUpdate(siteProfil: PartialUpdateSiteProfil): Observable<EntityResponseType> {
    return this.http.patch<ISiteProfil>(`${this.resourceUrl}/${this.getSiteProfilIdentifier(siteProfil)}`, siteProfil, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISiteProfil>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISiteProfil[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSiteProfilIdentifier(siteProfil: Pick<ISiteProfil, 'id'>): number {
    return siteProfil.id;
  }

  compareSiteProfil(o1: Pick<ISiteProfil, 'id'> | null, o2: Pick<ISiteProfil, 'id'> | null): boolean {
    return o1 && o2 ? this.getSiteProfilIdentifier(o1) === this.getSiteProfilIdentifier(o2) : o1 === o2;
  }

  addSiteProfilToCollectionIfMissing<Type extends Pick<ISiteProfil, 'id'>>(
    siteProfilCollection: Type[],
    ...siteProfilsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const siteProfils: Type[] = siteProfilsToCheck.filter(isPresent);
    if (siteProfils.length > 0) {
      const siteProfilCollectionIdentifiers = siteProfilCollection.map(siteProfilItem => this.getSiteProfilIdentifier(siteProfilItem));
      const siteProfilsToAdd = siteProfils.filter(siteProfilItem => {
        const siteProfilIdentifier = this.getSiteProfilIdentifier(siteProfilItem);
        if (siteProfilCollectionIdentifiers.includes(siteProfilIdentifier)) {
          return false;
        }
        siteProfilCollectionIdentifiers.push(siteProfilIdentifier);
        return true;
      });
      return [...siteProfilsToAdd, ...siteProfilCollection];
    }
    return siteProfilCollection;
  }
}
