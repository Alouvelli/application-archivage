import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import NiveauResolve from './route/niveau-routing-resolve.service';

const niveauRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/niveau.component').then(m => m.NiveauComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/niveau-detail.component').then(m => m.NiveauDetailComponent),
    resolve: {
      niveau: NiveauResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/niveau-update.component').then(m => m.NiveauUpdateComponent),
    resolve: {
      niveau: NiveauResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/niveau-update.component').then(m => m.NiveauUpdateComponent),
    resolve: {
      niveau: NiveauResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default niveauRoute;
