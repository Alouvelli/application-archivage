import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SiteProfil } from 'app/shared/model/site-profil.model';
import { SiteProfilService } from './site-profil.service';
import { SiteProfilComponent } from './site-profil.component';
import { SiteProfilDetailComponent } from './site-profil-detail.component';
import { SiteProfilUpdateComponent } from './site-profil-update.component';
import { SiteProfilDeletePopupComponent } from './site-profil-delete-dialog.component';
import { ISiteProfil } from 'app/shared/model/site-profil.model';

@Injectable({ providedIn: 'root' })
export class SiteProfilResolve implements Resolve<ISiteProfil> {
    constructor(private service: SiteProfilService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISiteProfil> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SiteProfil>) => response.ok),
                map((siteProfil: HttpResponse<SiteProfil>) => siteProfil.body)
            );
        }
        return of(new SiteProfil());
    }
}

export const siteProfilRoute: Routes = [
    {
        path: '',
        component: SiteProfilComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gestionEcoleApp.siteProfil.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SiteProfilDetailComponent,
        resolve: {
            siteProfil: SiteProfilResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.siteProfil.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SiteProfilUpdateComponent,
        resolve: {
            siteProfil: SiteProfilResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.siteProfil.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SiteProfilUpdateComponent,
        resolve: {
            siteProfil: SiteProfilResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.siteProfil.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const siteProfilPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SiteProfilDeletePopupComponent,
        resolve: {
            siteProfil: SiteProfilResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.siteProfil.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
