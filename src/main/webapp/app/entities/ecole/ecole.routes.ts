import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import EcoleResolve from './route/ecole-routing-resolve.service';

const ecoleRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/ecole.component').then(m => m.EcoleComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/ecole-detail.component').then(m => m.EcoleDetailComponent),
    resolve: {
      ecole: EcoleResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/ecole-update.component').then(m => m.EcoleUpdateComponent),
    resolve: {
      ecole: EcoleResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/ecole-update.component').then(m => m.EcoleUpdateComponent),
    resolve: {
      ecole: EcoleResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default ecoleRoute;
