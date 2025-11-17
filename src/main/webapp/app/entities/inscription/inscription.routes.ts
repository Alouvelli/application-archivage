import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import InscriptionResolve from './route/inscription-routing-resolve.service';

const inscriptionRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/inscription.component').then(m => m.InscriptionComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/inscription-detail.component').then(m => m.InscriptionDetailComponent),
    resolve: {
      inscription: InscriptionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/inscription-update.component').then(m => m.InscriptionUpdateComponent),
    resolve: {
      inscription: InscriptionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/inscription-update.component').then(m => m.InscriptionUpdateComponent),
    resolve: {
      inscription: InscriptionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default inscriptionRoute;
