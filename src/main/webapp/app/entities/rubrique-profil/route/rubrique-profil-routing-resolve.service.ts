import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRubriqueProfil } from '../rubrique-profil.model';
import { RubriqueProfilService } from '../service/rubrique-profil.service';

const rubriqueProfilResolve = (route: ActivatedRouteSnapshot): Observable<null | IRubriqueProfil> => {
  const id = route.params.id;
  if (id) {
    return inject(RubriqueProfilService)
      .find(id)
      .pipe(
        mergeMap((rubriqueProfil: HttpResponse<IRubriqueProfil>) => {
          if (rubriqueProfil.body) {
            return of(rubriqueProfil.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default rubriqueProfilResolve;
