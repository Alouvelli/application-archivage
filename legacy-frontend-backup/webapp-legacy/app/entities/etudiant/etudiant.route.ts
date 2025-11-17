import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Etudiant } from 'app/shared/model/etudiant.model';
import { EtudiantService } from './etudiant.service';
import { EtudiantComponent } from './etudiant.component';
import { EtudiantDetailComponent } from './etudiant-detail.component';
import { EtudiantUpdateComponent } from './etudiant-update.component';
import { EtudiantDeletePopupComponent } from './etudiant-delete-dialog.component';
import { IEtudiant } from 'app/shared/model/etudiant.model';

@Injectable({ providedIn: 'root' })
export class EtudiantResolve implements Resolve<IEtudiant> {
    constructor(private service: EtudiantService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEtudiant> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Etudiant>) => response.ok),
                map((etudiant: HttpResponse<Etudiant>) => etudiant.body)
            );
        }
        return of(new Etudiant());
    }
}

export const etudiantRoute: Routes = [
    {
        path: '',
        component: EtudiantComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gestionEcoleApp.etudiant.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: EtudiantDetailComponent,
        resolve: {
            etudiant: EtudiantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.etudiant.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: EtudiantUpdateComponent,
        resolve: {
            etudiant: EtudiantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.etudiant.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: EtudiantUpdateComponent,
        resolve: {
            etudiant: EtudiantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.etudiant.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const etudiantPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: EtudiantDeletePopupComponent,
        resolve: {
            etudiant: EtudiantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.etudiant.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
