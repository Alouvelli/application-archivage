import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ResolveFn, Routes, Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Classe, IClasse } from 'app/shared/model/classe.model';
import { ClasseService } from './classe.service';
import { ClasseComponent } from './classe.component';
import { ClasseDetailComponent } from './classe-detail.component';
import { ClasseUpdateComponent } from './classe-update.component';

const classeResolve: ResolveFn<IClasse> = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];
  if (id) {
    const service = inject(ClasseService);
    const router = inject(Router);
    return service.find(id).pipe(
      mergeMap((response: HttpResponse<IClasse>) => {
        const classe = response.body;
        if (classe) {
          return of(classe);
        }
        router.navigate(['404']);
        return EMPTY;
      })
    );
  }
  return of(new Classe());
};

export const classeRoute: Routes = [
  {
    path: '',
    component: ClasseComponent,
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gestionEcoleApp.classe.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ClasseDetailComponent,
    resolve: {
      classe: classeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestionEcoleApp.classe.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ClasseUpdateComponent,
    resolve: {
      classe: classeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestionEcoleApp.classe.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ClasseUpdateComponent,
    resolve: {
      classe: classeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestionEcoleApp.classe.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
