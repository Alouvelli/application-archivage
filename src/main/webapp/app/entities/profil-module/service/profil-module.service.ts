import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProfilModule, NewProfilModule } from '../profil-module.model';

export type PartialUpdateProfilModule = Partial<IProfilModule> & Pick<IProfilModule, 'id'>;

export type EntityResponseType = HttpResponse<IProfilModule>;
export type EntityArrayResponseType = HttpResponse<IProfilModule[]>;

@Injectable({ providedIn: 'root' })
export class ProfilModuleService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/profil-modules');

  create(profilModule: NewProfilModule): Observable<EntityResponseType> {
    return this.http.post<IProfilModule>(this.resourceUrl, profilModule, { observe: 'response' });
  }

  update(profilModule: IProfilModule): Observable<EntityResponseType> {
    return this.http.put<IProfilModule>(`${this.resourceUrl}/${this.getProfilModuleIdentifier(profilModule)}`, profilModule, {
      observe: 'response',
    });
  }

  partialUpdate(profilModule: PartialUpdateProfilModule): Observable<EntityResponseType> {
    return this.http.patch<IProfilModule>(`${this.resourceUrl}/${this.getProfilModuleIdentifier(profilModule)}`, profilModule, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProfilModule>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProfilModule[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getProfilModuleIdentifier(profilModule: Pick<IProfilModule, 'id'>): number {
    return profilModule.id;
  }

  compareProfilModule(o1: Pick<IProfilModule, 'id'> | null, o2: Pick<IProfilModule, 'id'> | null): boolean {
    return o1 && o2 ? this.getProfilModuleIdentifier(o1) === this.getProfilModuleIdentifier(o2) : o1 === o2;
  }

  addProfilModuleToCollectionIfMissing<Type extends Pick<IProfilModule, 'id'>>(
    profilModuleCollection: Type[],
    ...profilModulesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const profilModules: Type[] = profilModulesToCheck.filter(isPresent);
    if (profilModules.length > 0) {
      const profilModuleCollectionIdentifiers = profilModuleCollection.map(profilModuleItem =>
        this.getProfilModuleIdentifier(profilModuleItem),
      );
      const profilModulesToAdd = profilModules.filter(profilModuleItem => {
        const profilModuleIdentifier = this.getProfilModuleIdentifier(profilModuleItem);
        if (profilModuleCollectionIdentifiers.includes(profilModuleIdentifier)) {
          return false;
        }
        profilModuleCollectionIdentifiers.push(profilModuleIdentifier);
        return true;
      });
      return [...profilModulesToAdd, ...profilModuleCollection];
    }
    return profilModuleCollection;
  }
}
