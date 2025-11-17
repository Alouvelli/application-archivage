import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISemestre } from '../semestre.model';
import { SemestreService } from '../service/semestre.service';

const semestreResolve = (route: ActivatedRouteSnapshot): Observable<null | ISemestre> => {
  const id = route.params.id;
  if (id) {
    return inject(SemestreService)
      .find(id)
      .pipe(
        mergeMap((semestre: HttpResponse<ISemestre>) => {
          if (semestre.body) {
            return of(semestre.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default semestreResolve;
