import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Departement } from 'app/shared/model/departement.model';
import { DepartementService } from './departement.service';
import { DepartementComponent } from './departement.component';
import { DepartementDetailComponent } from './departement-detail.component';
import { DepartementUpdateComponent } from './departement-update.component';
import { DepartementDeletePopupComponent } from './departement-delete-dialog.component';
import { IDepartement } from 'app/shared/model/departement.model';
import {DepartementFiliereComponent} from "./departementFiliere.component";
import {DepartementClasseComponent} from "./departementClasse.component";

@Injectable({ providedIn: 'root' })
export class DepartementResolve implements Resolve<IDepartement> {
    constructor(private service: DepartementService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDepartement> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Departement>) => response.ok),
                map((departement: HttpResponse<Departement>) => departement.body)
            );
        }
        return of(new Departement());
    }
}

export const departementRoute: Routes = [
    {
        path: '',
        component: DepartementComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
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
            departement: DepartementResolve
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
            departement: DepartementResolve
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
            departement: DepartementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.departement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':name/editFiliere',
        component: DepartementFiliereComponent,
        resolve: {
            departement: DepartementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.departement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':name/editDocument',
        component: DepartementClasseComponent,
        resolve: {
            departement: DepartementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.departement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const departementPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DepartementDeletePopupComponent,
        resolve: {
            departement: DepartementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.departement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
