import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INiveaudocument } from '../niveaudocument.model';
import { NiveaudocumentService } from '../service/niveaudocument.service';

const niveaudocumentResolve = (route: ActivatedRouteSnapshot): Observable<null | INiveaudocument> => {
  const id = route.params.id;
  if (id) {
    return inject(NiveaudocumentService)
      .find(id)
      .pipe(
        mergeMap((niveaudocument: HttpResponse<INiveaudocument>) => {
          if (niveaudocument.body) {
            return of(niveaudocument.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default niveaudocumentResolve;
