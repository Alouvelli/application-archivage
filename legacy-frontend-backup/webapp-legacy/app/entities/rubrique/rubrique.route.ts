import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Rubrique } from 'app/shared/model/rubrique.model';
import { RubriqueService } from './rubrique.service';
import { RubriqueComponent } from './rubrique.component';
import { RubriqueDetailComponent } from './rubrique-detail.component';
import { RubriqueUpdateComponent } from './rubrique-update.component';
import { RubriqueDeletePopupComponent } from './rubrique-delete-dialog.component';
import { IRubrique } from 'app/shared/model/rubrique.model';

@Injectable({ providedIn: 'root' })
export class RubriqueResolve implements Resolve<IRubrique> {
    constructor(private service: RubriqueService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRubrique> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Rubrique>) => response.ok),
                map((rubrique: HttpResponse<Rubrique>) => rubrique.body)
            );
        }
        return of(new Rubrique());
    }
}

export const rubriqueRoute: Routes = [
    {
        path: '',
        component: RubriqueComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gestionEcoleApp.rubrique.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: RubriqueDetailComponent,
        resolve: {
            rubrique: RubriqueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.rubrique.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: RubriqueUpdateComponent,
        resolve: {
            rubrique: RubriqueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.rubrique.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: RubriqueUpdateComponent,
        resolve: {
            rubrique: RubriqueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.rubrique.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rubriquePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: RubriqueDeletePopupComponent,
        resolve: {
            rubrique: RubriqueResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.rubrique.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
