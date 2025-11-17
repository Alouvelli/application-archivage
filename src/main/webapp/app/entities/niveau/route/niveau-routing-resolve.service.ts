import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INiveau } from '../niveau.model';
import { NiveauService } from '../service/niveau.service';

const niveauResolve = (route: ActivatedRouteSnapshot): Observable<null | INiveau> => {
  const id = route.params.id;
  if (id) {
    return inject(NiveauService)
      .find(id)
      .pipe(
        mergeMap((niveau: HttpResponse<INiveau>) => {
          if (niveau.body) {
            return of(niveau.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default niveauResolve;
