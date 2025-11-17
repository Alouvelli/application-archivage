import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import SemestreResolve from './route/semestre-routing-resolve.service';

const semestreRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/semestre.component').then(m => m.SemestreComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/semestre-detail.component').then(m => m.SemestreDetailComponent),
    resolve: {
      semestre: SemestreResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/semestre-update.component').then(m => m.SemestreUpdateComponent),
    resolve: {
      semestre: SemestreResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/semestre-update.component').then(m => m.SemestreUpdateComponent),
    resolve: {
      semestre: SemestreResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default semestreRoute;
