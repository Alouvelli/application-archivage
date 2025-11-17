import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import NiveaudocumentResolve from './route/niveaudocument-routing-resolve.service';

const niveaudocumentRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/niveaudocument.component').then(m => m.NiveaudocumentComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/niveaudocument-detail.component').then(m => m.NiveaudocumentDetailComponent),
    resolve: {
      niveaudocument: NiveaudocumentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/niveaudocument-update.component').then(m => m.NiveaudocumentUpdateComponent),
    resolve: {
      niveaudocument: NiveaudocumentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/niveaudocument-update.component').then(m => m.NiveaudocumentUpdateComponent),
    resolve: {
      niveaudocument: NiveaudocumentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default niveaudocumentRoute;
