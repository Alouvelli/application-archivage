import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Documentexcel } from 'app/shared/model/documentexcel.model';
import { DocumentexcelService } from './documentexcel.service';
import { DocumentexcelComponent } from './documentexcel.component';
import { DocumentexcelDetailComponent } from './documentexcel-detail.component';
import { DocumentexcelUpdateComponent } from './documentexcel-update.component';
import { DocumentexcelDeletePopupComponent } from './documentexcel-delete-dialog.component';
import { IDocumentexcel } from 'app/shared/model/documentexcel.model';

@Injectable({ providedIn: 'root' })
export class DocumentexcelResolve implements Resolve<IDocumentexcel> {
    constructor(private service: DocumentexcelService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDocumentexcel> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Documentexcel>) => response.ok),
                map((documentexcel: HttpResponse<Documentexcel>) => documentexcel.body)
            );
        }
        return of(new Documentexcel());
    }
}

export const documentexcelRoute: Routes = [
    {
        path: '',
        component: DocumentexcelComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gestionEcoleApp.documentexcel.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DocumentexcelDetailComponent,
        resolve: {
            documentexcel: DocumentexcelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.documentexcel.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DocumentexcelUpdateComponent,
        resolve: {
            documentexcel: DocumentexcelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.documentexcel.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DocumentexcelUpdateComponent,
        resolve: {
            documentexcel: DocumentexcelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.documentexcel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const documentexcelPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DocumentexcelDeletePopupComponent,
        resolve: {
            documentexcel: DocumentexcelResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.documentexcel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
