import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAnneescolaire } from '../anneescolaire.model';
import { AnneescolaireService } from '../service/anneescolaire.service';

const anneescolaireResolve = (route: ActivatedRouteSnapshot): Observable<null | IAnneescolaire> => {
  const id = route.params.id;
  if (id) {
    return inject(AnneescolaireService)
      .find(id)
      .pipe(
        mergeMap((anneescolaire: HttpResponse<IAnneescolaire>) => {
          if (anneescolaire.body) {
            return of(anneescolaire.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default anneescolaireResolve;
