import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Anneescolaire } from 'app/shared/model/anneescolaire.model';
import { AnneescolaireService } from './anneescolaire.service';
import { AnneescolaireComponent } from './anneescolaire.component';
import { AnneescolaireDetailComponent } from './anneescolaire-detail.component';
import { AnneescolaireUpdateComponent } from './anneescolaire-update.component';
import { AnneescolaireDeletePopupComponent } from './anneescolaire-delete-dialog.component';
import { IAnneescolaire } from 'app/shared/model/anneescolaire.model';

@Injectable({ providedIn: 'root' })
export class AnneescolaireResolve implements Resolve<IAnneescolaire> {
    constructor(private service: AnneescolaireService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAnneescolaire> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Anneescolaire>) => response.ok),
                map((anneescolaire: HttpResponse<Anneescolaire>) => anneescolaire.body)
            );
        }
        return of(new Anneescolaire());
    }
}

export const anneescolaireRoute: Routes = [
    {
        path: '',
        component: AnneescolaireComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
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
            anneescolaire: AnneescolaireResolve
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
            anneescolaire: AnneescolaireResolve
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
            anneescolaire: AnneescolaireResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.anneescolaire.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const anneescolairePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: AnneescolaireDeletePopupComponent,
        resolve: {
            anneescolaire: AnneescolaireResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.anneescolaire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
