import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import TypeDocumentResolve from './route/type-document-routing-resolve.service';

const typeDocumentRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/type-document.component').then(m => m.TypeDocumentComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/type-document-detail.component').then(m => m.TypeDocumentDetailComponent),
    resolve: {
      typeDocument: TypeDocumentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/type-document-update.component').then(m => m.TypeDocumentUpdateComponent),
    resolve: {
      typeDocument: TypeDocumentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/type-document-update.component').then(m => m.TypeDocumentUpdateComponent),
    resolve: {
      typeDocument: TypeDocumentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default typeDocumentRoute;
