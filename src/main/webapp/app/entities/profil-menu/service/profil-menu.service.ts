import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProfilMenu, NewProfilMenu } from '../profil-menu.model';

export type PartialUpdateProfilMenu = Partial<IProfilMenu> & Pick<IProfilMenu, 'id'>;

export type EntityResponseType = HttpResponse<IProfilMenu>;
export type EntityArrayResponseType = HttpResponse<IProfilMenu[]>;

@Injectable({ providedIn: 'root' })
export class ProfilMenuService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/profil-menus');

  create(profilMenu: NewProfilMenu): Observable<EntityResponseType> {
    return this.http.post<IProfilMenu>(this.resourceUrl, profilMenu, { observe: 'response' });
  }

  update(profilMenu: IProfilMenu): Observable<EntityResponseType> {
    return this.http.put<IProfilMenu>(`${this.resourceUrl}/${this.getProfilMenuIdentifier(profilMenu)}`, profilMenu, {
      observe: 'response',
    });
  }

  partialUpdate(profilMenu: PartialUpdateProfilMenu): Observable<EntityResponseType> {
    return this.http.patch<IProfilMenu>(`${this.resourceUrl}/${this.getProfilMenuIdentifier(profilMenu)}`, profilMenu, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProfilMenu>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProfilMenu[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getProfilMenuIdentifier(profilMenu: Pick<IProfilMenu, 'id'>): number {
    return profilMenu.id;
  }

  compareProfilMenu(o1: Pick<IProfilMenu, 'id'> | null, o2: Pick<IProfilMenu, 'id'> | null): boolean {
    return o1 && o2 ? this.getProfilMenuIdentifier(o1) === this.getProfilMenuIdentifier(o2) : o1 === o2;
  }

  addProfilMenuToCollectionIfMissing<Type extends Pick<IProfilMenu, 'id'>>(
    profilMenuCollection: Type[],
    ...profilMenusToCheck: (Type | null | undefined)[]
  ): Type[] {
    const profilMenus: Type[] = profilMenusToCheck.filter(isPresent);
    if (profilMenus.length > 0) {
      const profilMenuCollectionIdentifiers = profilMenuCollection.map(profilMenuItem => this.getProfilMenuIdentifier(profilMenuItem));
      const profilMenusToAdd = profilMenus.filter(profilMenuItem => {
        const profilMenuIdentifier = this.getProfilMenuIdentifier(profilMenuItem);
        if (profilMenuCollectionIdentifiers.includes(profilMenuIdentifier)) {
          return false;
        }
        profilMenuCollectionIdentifiers.push(profilMenuIdentifier);
        return true;
      });
      return [...profilMenusToAdd, ...profilMenuCollection];
    }
    return profilMenuCollection;
  }
}
