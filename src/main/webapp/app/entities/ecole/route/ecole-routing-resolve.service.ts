import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEcole } from '../ecole.model';
import { EcoleService } from '../service/ecole.service';

const ecoleResolve = (route: ActivatedRouteSnapshot): Observable<null | IEcole> => {
  const id = route.params.id;
  if (id) {
    return inject(EcoleService)
      .find(id)
      .pipe(
        mergeMap((ecole: HttpResponse<IEcole>) => {
          if (ecole.body) {
            return of(ecole.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default ecoleResolve;
