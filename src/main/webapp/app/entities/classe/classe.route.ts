import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Classe } from 'app/shared/model/classe.model';
import { ClasseService } from './classe.service';
import { ClasseComponent } from './classe.component';
import { ClasseDetailComponent } from './classe-detail.component';
import { ClasseUpdateComponent } from './classe-update.component';
import { ClasseDeletePopupComponent } from './classe-delete-dialog.component';
import { IClasse } from 'app/shared/model/classe.model';

@Injectable({ providedIn: 'root' })
export class ClasseResolve implements Resolve<IClasse> {
    constructor(private service: ClasseService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IClasse> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Classe>) => response.ok),
                map((classe: HttpResponse<Classe>) => classe.body)
            );
        }
        return of(new Classe());
    }
}

export const classeRoute: Routes = [
    {
        path: '',
        component: ClasseComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
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
            classe: ClasseResolve
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
            classe: ClasseResolve
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
            classe: ClasseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.classe.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const classePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ClasseDeletePopupComponent,
        resolve: {
            classe: ClasseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.classe.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
