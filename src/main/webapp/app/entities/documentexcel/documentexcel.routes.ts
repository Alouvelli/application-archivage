import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import DocumentexcelResolve from './route/documentexcel-routing-resolve.service';

const documentexcelRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/documentexcel.component').then(m => m.DocumentexcelComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/documentexcel-detail.component').then(m => m.DocumentexcelDetailComponent),
    resolve: {
      documentexcel: DocumentexcelResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/documentexcel-update.component').then(m => m.DocumentexcelUpdateComponent),
    resolve: {
      documentexcel: DocumentexcelResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/documentexcel-update.component').then(m => m.DocumentexcelUpdateComponent),
    resolve: {
      documentexcel: DocumentexcelResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default documentexcelRoute;
