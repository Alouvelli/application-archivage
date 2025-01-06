import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Filiere } from 'app/shared/model/filiere.model';
import { FiliereService } from './filiere.service';
import { FiliereComponent } from './filiere.component';
import { FiliereDetailComponent } from './filiere-detail.component';
import { FiliereUpdateComponent } from './filiere-update.component';
import { FiliereDeletePopupComponent } from './filiere-delete-dialog.component';
import { IFiliere } from 'app/shared/model/filiere.model';
import {FiliereClasseComponent} from "./filiere-Classe.component";
import {DocumentClasseComponent} from "./document-Classe.component";

@Injectable({ providedIn: 'root' })
export class FiliereResolve implements Resolve<IFiliere> {
    constructor(private service: FiliereService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFiliere> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Filiere>) => response.ok),
                map((filiere: HttpResponse<Filiere>) => filiere.body)
            );
        }
        return of(new Filiere());
    }
}

export const filiereRoute: Routes = [
    {
        path: '',
        component: FiliereComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gestionEcoleApp.filiere.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: FiliereDetailComponent,
        resolve: {
            filiere: FiliereResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.filiere.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: FiliereUpdateComponent,
        resolve: {
            filiere: FiliereResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.filiere.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: FiliereUpdateComponent,
        resolve: {
            filiere: FiliereResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.filiere.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':name/editClasse',
        component: FiliereClasseComponent,
        resolve: {
            filiere: FiliereResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.filiere.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':name/documentClasse',
        component: DocumentClasseComponent,
        resolve: {
            filiere: FiliereResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.filiere.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const filierePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: FiliereDeletePopupComponent,
        resolve: {
            filiere: FiliereResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.filiere.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
