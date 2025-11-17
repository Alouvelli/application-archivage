import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import ProfilModuleResolve from './route/profil-module-routing-resolve.service';

const profilModuleRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/profil-module.component').then(m => m.ProfilModuleComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/profil-module-detail.component').then(m => m.ProfilModuleDetailComponent),
    resolve: {
      profilModule: ProfilModuleResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/profil-module-update.component').then(m => m.ProfilModuleUpdateComponent),
    resolve: {
      profilModule: ProfilModuleResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/profil-module-update.component').then(m => m.ProfilModuleUpdateComponent),
    resolve: {
      profilModule: ProfilModuleResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default profilModuleRoute;
