import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ResolveFn, Routes, Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITypeDocument, TypeDocument } from 'app/shared/model/type-document.model';
import { TypeDocumentService } from './type-document.service';
import { TypeDocumentComponent } from './type-document.component';
import { TypeDocumentDetailComponent } from './type-document-detail.component';
import { TypeDocumentUpdateComponent } from './type-document-update.component';

const typeDocumentResolve: ResolveFn<ITypeDocument> = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];
  if (id) {
    const service = inject(TypeDocumentService);
    const router = inject(Router);
    return service.find(id).pipe(
      mergeMap((response: HttpResponse<ITypeDocument>) => {
        const typeDocument = response.body;
        if (typeDocument) {
          return of(typeDocument);
        }
        router.navigate(['404']);
        return EMPTY;
      })
    );
  }
  return of(new TypeDocument());
};

export const typeDocumentRoute: Routes = [
  {
    path: '',
    component: TypeDocumentComponent,
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gestionEcoleApp.typeDocument.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TypeDocumentDetailComponent,
    resolve: { typeDocument: typeDocumentResolve },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestionEcoleApp.typeDocument.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TypeDocumentUpdateComponent,
    resolve: { typeDocument: typeDocumentResolve },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestionEcoleApp.typeDocument.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TypeDocumentUpdateComponent,
    resolve: { typeDocument: typeDocumentResolve },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestionEcoleApp.typeDocument.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
