import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Semestre } from 'app/shared/model/semestre.model';
import { SemestreService } from './semestre.service';
import { SemestreComponent } from './semestre.component';
import { SemestreDetailComponent } from './semestre-detail.component';
import { SemestreUpdateComponent } from './semestre-update.component';
import { SemestreDeletePopupComponent } from './semestre-delete-dialog.component';
import { ISemestre } from 'app/shared/model/semestre.model';

@Injectable({ providedIn: 'root' })
export class SemestreResolve implements Resolve<ISemestre> {
    constructor(private service: SemestreService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISemestre> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Semestre>) => response.ok),
                map((semestre: HttpResponse<Semestre>) => semestre.body)
            );
        }
        return of(new Semestre());
    }
}

export const semestreRoute: Routes = [
    {
        path: '',
        component: SemestreComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gestionEcoleApp.semestre.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SemestreDetailComponent,
        resolve: {
            semestre: SemestreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.semestre.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SemestreUpdateComponent,
        resolve: {
            semestre: SemestreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.semestre.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SemestreUpdateComponent,
        resolve: {
            semestre: SemestreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.semestre.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const semestrePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SemestreDeletePopupComponent,
        resolve: {
            semestre: SemestreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.semestre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
