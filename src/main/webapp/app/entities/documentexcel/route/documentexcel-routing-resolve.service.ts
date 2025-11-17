import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDocumentexcel } from '../documentexcel.model';
import { DocumentexcelService } from '../service/documentexcel.service';

const documentexcelResolve = (route: ActivatedRouteSnapshot): Observable<null | IDocumentexcel> => {
  const id = route.params.id;
  if (id) {
    return inject(DocumentexcelService)
      .find(id)
      .pipe(
        mergeMap((documentexcel: HttpResponse<IDocumentexcel>) => {
          if (documentexcel.body) {
            return of(documentexcel.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default documentexcelResolve;
