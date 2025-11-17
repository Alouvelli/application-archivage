import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProfilModule } from '../profil-module.model';
import { ProfilModuleService } from '../service/profil-module.service';

const profilModuleResolve = (route: ActivatedRouteSnapshot): Observable<null | IProfilModule> => {
  const id = route.params.id;
  if (id) {
    return inject(ProfilModuleService)
      .find(id)
      .pipe(
        mergeMap((profilModule: HttpResponse<IProfilModule>) => {
          if (profilModule.body) {
            return of(profilModule.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default profilModuleResolve;
