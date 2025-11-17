import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProfilMenu } from 'app/shared/model/profil-menu.model';
import { ProfilMenuService } from './profil-menu.service';
import { ProfilMenuComponent } from './profil-menu.component';
import { ProfilMenuDetailComponent } from './profil-menu-detail.component';
import { ProfilMenuUpdateComponent } from './profil-menu-update.component';
import { ProfilMenuDeletePopupComponent } from './profil-menu-delete-dialog.component';
import { IProfilMenu } from 'app/shared/model/profil-menu.model';

@Injectable({ providedIn: 'root' })
export class ProfilMenuResolve implements Resolve<IProfilMenu> {
    constructor(private service: ProfilMenuService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProfilMenu> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ProfilMenu>) => response.ok),
                map((profilMenu: HttpResponse<ProfilMenu>) => profilMenu.body)
            );
        }
        return of(new ProfilMenu());
    }
}

export const profilMenuRoute: Routes = [
    {
        path: '',
        component: ProfilMenuComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gestionEcoleApp.profilMenu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ProfilMenuDetailComponent,
        resolve: {
            profilMenu: ProfilMenuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.profilMenu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProfilMenuUpdateComponent,
        resolve: {
            profilMenu: ProfilMenuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.profilMenu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ProfilMenuUpdateComponent,
        resolve: {
            profilMenu: ProfilMenuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.profilMenu.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const profilMenuPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ProfilMenuDeletePopupComponent,
        resolve: {
            profilMenu: ProfilMenuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.profilMenu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
