import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import SiteProfilResolve from './route/site-profil-routing-resolve.service';

const siteProfilRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/site-profil.component').then(m => m.SiteProfilComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/site-profil-detail.component').then(m => m.SiteProfilDetailComponent),
    resolve: {
      siteProfil: SiteProfilResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/site-profil-update.component').then(m => m.SiteProfilUpdateComponent),
    resolve: {
      siteProfil: SiteProfilResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/site-profil-update.component').then(m => m.SiteProfilUpdateComponent),
    resolve: {
      siteProfil: SiteProfilResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default siteProfilRoute;
