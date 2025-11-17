import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import DocumentclasseResolve from './route/documentclasse-routing-resolve.service';

const documentclasseRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/documentclasse.component').then(m => m.DocumentclasseComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/documentclasse-detail.component').then(m => m.DocumentclasseDetailComponent),
    resolve: {
      documentclasse: DocumentclasseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/documentclasse-update.component').then(m => m.DocumentclasseUpdateComponent),
    resolve: {
      documentclasse: DocumentclasseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/documentclasse-update.component').then(m => m.DocumentclasseUpdateComponent),
    resolve: {
      documentclasse: DocumentclasseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default documentclasseRoute;
