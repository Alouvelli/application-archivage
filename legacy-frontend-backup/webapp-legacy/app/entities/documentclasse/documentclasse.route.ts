import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Documentclasse } from 'app/shared/model/documentclasse.model';
import { DocumentclasseService } from './documentclasse.service';
import { DocumentclasseComponent } from './documentclasse.component';
import { DocumentclasseDetailComponent } from './documentclasse-detail.component';
import { DocumentclasseUpdateComponent } from './documentclasse-update.component';
import { DocumentclasseDeletePopupComponent } from './documentclasse-delete-dialog.component';
import { IDocumentclasse } from 'app/shared/model/documentclasse.model';
import {Documentclasse2Component} from "./documentclasse2.component";
import {DocumentclasseUpdate2Component} from "./documentclasse-update2.component";

@Injectable({ providedIn: 'root' })
export class DocumentclasseResolve implements Resolve<IDocumentclasse> {
    constructor(private service: DocumentclasseService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDocumentclasse> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Documentclasse>) => response.ok),
                map((documentclasse: HttpResponse<Documentclasse>) => documentclasse.body)
            );
        }
        return of(new Documentclasse());
    }
}

export const documentclasseRoute: Routes = [
    {
        path: '',
        component: DocumentclasseComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gestionEcoleApp.documentclasse.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':name/document',
        component: Documentclasse2Component,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gestionEcoleApp.documentclasse.home.title'
        },
        canActivate: [UserRouteAccessService]
    },

    {
        path: ':id/view',
        component: DocumentclasseDetailComponent,
        resolve: {
            documentclasse: DocumentclasseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.documentclasse.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DocumentclasseUpdateComponent,
        resolve: {
            documentclasse: DocumentclasseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.documentclasse.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':name/new2',
        component: DocumentclasseUpdate2Component,
        resolve: {
            documentclasse: DocumentclasseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.documentclasse.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':name/new',
        component: DocumentclasseUpdateComponent,
        resolve: {
            documentclasse: DocumentclasseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.documentclasse.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DocumentclasseUpdateComponent,
        resolve: {
            documentclasse: DocumentclasseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.documentclasse.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const documentclassePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DocumentclasseDeletePopupComponent,
        resolve: {
            documentclasse: DocumentclasseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.documentclasse.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
