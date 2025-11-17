import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import ProfilMenuResolve from './route/profil-menu-routing-resolve.service';

const profilMenuRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/profil-menu.component').then(m => m.ProfilMenuComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/profil-menu-detail.component').then(m => m.ProfilMenuDetailComponent),
    resolve: {
      profilMenu: ProfilMenuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/profil-menu-update.component').then(m => m.ProfilMenuUpdateComponent),
    resolve: {
      profilMenu: ProfilMenuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/profil-menu-update.component').then(m => m.ProfilMenuUpdateComponent),
    resolve: {
      profilMenu: ProfilMenuResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default profilMenuRoute;
