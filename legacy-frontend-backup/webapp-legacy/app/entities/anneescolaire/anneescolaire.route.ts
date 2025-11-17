import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ResolveFn, Routes, Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Anneescolaire, IAnneescolaire } from 'app/shared/model/anneescolaire.model';
import { AnneescolaireService } from './anneescolaire.service';
import { AnneescolaireComponent } from './anneescolaire.component';
import { AnneescolaireDetailComponent } from './anneescolaire-detail.component';
import { AnneescolaireUpdateComponent } from './anneescolaire-update.component';

const anneescolaireResolve: ResolveFn<IAneescolaire> = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];
  if (id) {
    const service = inject(AnneescolaireService);
    const router = inject(Router);
    return service.find(id).pipe(
      mergeMap((response: HttpResponse<IAneescolaire>) => {
        const anneescolaire = response.body;
        if (anneescolaire) {
          return of(anneescolaire);
        }
        router.navigate(['404']);
        return EMPTY;
      })
    );
  }
  return of(new Anneescolaire());
};

export const anneescolaireRoute: Routes = [
  {
    path: '',
    component: AnneescolaireComponent,
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gestionEcoleApp.anneescolaire.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AnneescolaireDetailComponent,
    resolve: {
      anneescolaire: anneescolaireResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestionEcoleApp.anneescolaire.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AnneescolaireUpdateComponent,
    resolve: {
      anneescolaire: anneescolaireResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestionEcoleApp.anneescolaire.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AnneescolaireUpdateComponent,
    resolve: {
      anneescolaire: anneescolaireResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestionEcoleApp.anneescolaire.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
