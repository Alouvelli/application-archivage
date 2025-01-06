import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Employe } from 'app/shared/model/employe.model';
import { EmployeService } from './employe.service';
import { EmployeComponent } from './employe.component';
import { EmployeDetailComponent } from './employe-detail.component';
import { EmployeUpdateComponent } from './employe-update.component';
import { EmployeDeletePopupComponent } from './employe-delete-dialog.component';
import { IEmploye } from 'app/shared/model/employe.model';

@Injectable({ providedIn: 'root' })
export class EmployeResolve implements Resolve<IEmploye> {
    constructor(private service: EmployeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmploye> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Employe>) => response.ok),
                map((employe: HttpResponse<Employe>) => employe.body)
            );
        }
        return of(new Employe());
    }
}

export const employeRoute: Routes = [
    {
        path: '',
        component: EmployeComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
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
            employe: EmployeResolve
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
            employe: EmployeResolve
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
            employe: EmployeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.employe.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const employePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: EmployeDeletePopupComponent,
        resolve: {
            employe: EmployeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.employe.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
