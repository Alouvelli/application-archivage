import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ResolveFn, Routes, Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Filiere, IFiliere } from 'app/shared/model/filiere.model';
import { FiliereService } from './filiere.service';
import { FiliereComponent } from './filiere.component';
import { FiliereDetailComponent } from './filiere-detail.component';
import { FiliereUpdateComponent } from './filiere-update.component';

const filiereResolve: ResolveFn<IFiliere> = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];
  if (id) {
    const service = inject(FiliereService);
    const router = inject(Router);
    return service.find(id).pipe(
      mergeMap((response: HttpResponse<IFiliere>) => {
        const filiere = response.body;
        if (filiere) {
          return of(filiere);
        }
        router.navigate(['404']);
        return EMPTY;
      })
    );
  }
  return of(new Filiere());
};

export const filiereRoute: Routes = [
  {
    path: '',
    component: FiliereComponent,
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gestionEcoleApp.filiere.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FiliereDetailComponent,
    resolve: {
      filiere: filiereResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestionEcoleApp.filiere.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FiliereUpdateComponent,
    resolve: {
      filiere: filiereResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestionEcoleApp.filiere.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FiliereUpdateComponent,
    resolve: {
      filiere: filiereResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestionEcoleApp.filiere.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
