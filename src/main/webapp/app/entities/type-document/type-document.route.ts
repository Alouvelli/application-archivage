import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TypeDocument } from 'app/shared/model/type-document.model';
import { TypeDocumentService } from './type-document.service';
import { TypeDocumentComponent } from './type-document.component';
import { TypeDocumentDetailComponent } from './type-document-detail.component';
import { TypeDocumentUpdateComponent } from './type-document-update.component';
import { TypeDocumentDeletePopupComponent } from './type-document-delete-dialog.component';
import { ITypeDocument } from 'app/shared/model/type-document.model';

@Injectable({ providedIn: 'root' })
export class TypeDocumentResolve implements Resolve<ITypeDocument> {
    constructor(private service: TypeDocumentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITypeDocument> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TypeDocument>) => response.ok),
                map((typeDocument: HttpResponse<TypeDocument>) => typeDocument.body)
            );
        }
        return of(new TypeDocument());
    }
}

export const typeDocumentRoute: Routes = [
    {
        path: '',
        component: TypeDocumentComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gestionEcoleApp.typeDocument.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TypeDocumentDetailComponent,
        resolve: {
            typeDocument: TypeDocumentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.typeDocument.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TypeDocumentUpdateComponent,
        resolve: {
            typeDocument: TypeDocumentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.typeDocument.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TypeDocumentUpdateComponent,
        resolve: {
            typeDocument: TypeDocumentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.typeDocument.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const typeDocumentPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TypeDocumentDeletePopupComponent,
        resolve: {
            typeDocument: TypeDocumentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.typeDocument.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
