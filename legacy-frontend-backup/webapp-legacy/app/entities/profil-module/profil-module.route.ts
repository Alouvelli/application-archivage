import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProfilModule } from 'app/shared/model/profil-module.model';
import { ProfilModuleService } from './profil-module.service';
import { ProfilModuleComponent } from './profil-module.component';
import { ProfilModuleDetailComponent } from './profil-module-detail.component';
import { ProfilModuleUpdateComponent } from './profil-module-update.component';
import { ProfilModuleDeletePopupComponent } from './profil-module-delete-dialog.component';
import { IProfilModule } from 'app/shared/model/profil-module.model';

@Injectable({ providedIn: 'root' })
export class ProfilModuleResolve implements Resolve<IProfilModule> {
    constructor(private service: ProfilModuleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProfilModule> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ProfilModule>) => response.ok),
                map((profilModule: HttpResponse<ProfilModule>) => profilModule.body)
            );
        }
        return of(new ProfilModule());
    }
}

export const profilModuleRoute: Routes = [
    {
        path: '',
        component: ProfilModuleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.profilModule.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ProfilModuleDetailComponent,
        resolve: {
            profilModule: ProfilModuleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.profilModule.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProfilModuleUpdateComponent,
        resolve: {
            profilModule: ProfilModuleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.profilModule.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ProfilModuleUpdateComponent,
        resolve: {
            profilModule: ProfilModuleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.profilModule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const profilModulePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ProfilModuleDeletePopupComponent,
        resolve: {
            profilModule: ProfilModuleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.profilModule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
