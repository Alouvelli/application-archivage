import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDocumentclasse } from '../documentclasse.model';
import { DocumentclasseService } from '../service/documentclasse.service';

const documentclasseResolve = (route: ActivatedRouteSnapshot): Observable<null | IDocumentclasse> => {
  const id = route.params.id;
  if (id) {
    return inject(DocumentclasseService)
      .find(id)
      .pipe(
        mergeMap((documentclasse: HttpResponse<IDocumentclasse>) => {
          if (documentclasse.body) {
            return of(documentclasse.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default documentclasseResolve;
