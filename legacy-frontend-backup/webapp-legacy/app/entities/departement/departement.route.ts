import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ResolveFn, Routes, Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Departement, IDepartement } from 'app/shared/model/departement.model';
import { DepartementService } from './departement.service';
import { DepartementComponent } from './departement.component';
import { DepartementDetailComponent } from './departement-detail.component';
import { DepartementUpdateComponent } from './departement-update.component';

const departementResolve: ResolveFn<IDepartement> = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];
  if (id) {
    const service = inject(DepartementService);
    const router = inject(Router);
    return service.find(id).pipe(
      mergeMap((response: HttpResponse<IDepartement>) => {
        const departement = response.body;
        if (departement) {
          return of(departement);
        }
        router.navigate(['404']);
        return EMPTY;
      })
    );
  }
  return of(new Departement());
};

export const departementRoute: Routes = [
  {
    path: '',
    component: DepartementComponent,
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gestionEcoleApp.departement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DepartementDetailComponent,
    resolve: {
      departement: departementResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestionEcoleApp.departement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DepartementUpdateComponent,
    resolve: {
      departement: departementResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestionEcoleApp.departement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DepartementUpdateComponent,
    resolve: {
      departement: departementResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestionEcoleApp.departement.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
