import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Ecole } from 'app/shared/model/ecole.model';
import { EcoleService } from './ecole.service';
import { EcoleComponent } from './ecole.component';
import { EcoleDetailComponent } from './ecole-detail.component';
import { EcoleUpdateComponent } from './ecole-update.component';
import { EcoleDeletePopupComponent } from './ecole-delete-dialog.component';
import { IEcole } from 'app/shared/model/ecole.model';

@Injectable({ providedIn: 'root' })
export class EcoleResolve implements Resolve<IEcole> {
    constructor(private service: EcoleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEcole> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Ecole>) => response.ok),
                map((ecole: HttpResponse<Ecole>) => ecole.body)
            );
        }
        return of(new Ecole());
    }
}

export const ecoleRoute: Routes = [
    {
        path: 'ecole',
        component: EcoleComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gestionEcoleApp.ecole.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ecole/:id/view',
        component: EcoleDetailComponent,
        resolve: {
            ecole: EcoleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.ecole.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ecole/new',
        component: EcoleUpdateComponent,
        resolve: {
            ecole: EcoleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.ecole.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ecole/:id/edit',
        component: EcoleUpdateComponent,
        resolve: {
            ecole: EcoleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.ecole.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ecolePopupRoute: Routes = [
    {
        path: 'ecole/:id/delete',
        component: EcoleDeletePopupComponent,
        resolve: {
            ecole: EcoleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.ecole.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
