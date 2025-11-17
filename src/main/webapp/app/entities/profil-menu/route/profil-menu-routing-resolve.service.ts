import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProfilMenu } from '../profil-menu.model';
import { ProfilMenuService } from '../service/profil-menu.service';

const profilMenuResolve = (route: ActivatedRouteSnapshot): Observable<null | IProfilMenu> => {
  const id = route.params.id;
  if (id) {
    return inject(ProfilMenuService)
      .find(id)
      .pipe(
        mergeMap((profilMenu: HttpResponse<IProfilMenu>) => {
          if (profilMenu.body) {
            return of(profilMenu.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default profilMenuResolve;
