import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ResolveFn, Routes, Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Employe, IEmploye } from 'app/shared/model/employe.model';
import { EmployeService } from './employe.service';
import { EmployeComponent } from './employe.component';
import { EmployeDetailComponent } from './employe-detail.component';
import { EmployeUpdateComponent } from './employe-update.component';

const employeResolve: ResolveFn<IEmploye> = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];
  if (id) {
    const service = inject(EmployeService);
    const router = inject(Router);
    return service.find(id).pipe(
      mergeMap((response: HttpResponse<IEmploye>) => {
        const employe = response.body;
        if (employe) {
          return of(employe);
        }
        router.navigate(['404']);
        return EMPTY;
      })
    );
  }
  return of(new Employe());
};

export const employeRoute: Routes = [
  {
    path: '',
    component: EmployeComponent,
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gestionEcoleApp.employe.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EmployeDetailComponent,
    resolve: {
      employe: employeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestionEcoleApp.employe.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EmployeUpdateComponent,
    resolve: {
      employe: employeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestionEcoleApp.employe.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EmployeUpdateComponent,
    resolve: {
      employe: employeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestionEcoleApp.employe.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
