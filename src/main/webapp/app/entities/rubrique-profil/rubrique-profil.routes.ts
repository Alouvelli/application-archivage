import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import RubriqueProfilResolve from './route/rubrique-profil-routing-resolve.service';

const rubriqueProfilRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/rubrique-profil.component').then(m => m.RubriqueProfilComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/rubrique-profil-detail.component').then(m => m.RubriqueProfilDetailComponent),
    resolve: {
      rubriqueProfil: RubriqueProfilResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/rubrique-profil-update.component').then(m => m.RubriqueProfilUpdateComponent),
    resolve: {
      rubriqueProfil: RubriqueProfilResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/rubrique-profil-update.component').then(m => m.RubriqueProfilUpdateComponent),
    resolve: {
      rubriqueProfil: RubriqueProfilResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default rubriqueProfilRoute;
