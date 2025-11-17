import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import AnneescolaireResolve from './route/anneescolaire-routing-resolve.service';

const anneescolaireRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/anneescolaire.component').then(m => m.AnneescolaireComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/anneescolaire-detail.component').then(m => m.AnneescolaireDetailComponent),
    resolve: {
      anneescolaire: AnneescolaireResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/anneescolaire-update.component').then(m => m.AnneescolaireUpdateComponent),
    resolve: {
      anneescolaire: AnneescolaireResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/anneescolaire-update.component').then(m => m.AnneescolaireUpdateComponent),
    resolve: {
      anneescolaire: AnneescolaireResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default anneescolaireRoute;
