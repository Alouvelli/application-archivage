import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RubriqueProfil } from 'app/shared/model/rubrique-profil.model';
import { RubriqueProfilService } from './rubrique-profil.service';
import { RubriqueProfilComponent } from './rubrique-profil.component';
import { RubriqueProfilDetailComponent } from './rubrique-profil-detail.component';
import { RubriqueProfilUpdateComponent } from './rubrique-profil-update.component';
import { RubriqueProfilDeletePopupComponent } from './rubrique-profil-delete-dialog.component';
import { IRubriqueProfil } from 'app/shared/model/rubrique-profil.model';

@Injectable({ providedIn: 'root' })
export class RubriqueProfilResolve implements Resolve<IRubriqueProfil> {
    constructor(private service: RubriqueProfilService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRubriqueProfil> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RubriqueProfil>) => response.ok),
                map((rubriqueProfil: HttpResponse<RubriqueProfil>) => rubriqueProfil.body)
            );
        }
        return of(new RubriqueProfil());
    }
}

export const rubriqueProfilRoute: Routes = [
    {
        path: '',
        component: RubriqueProfilComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.rubriqueProfil.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: RubriqueProfilDetailComponent,
        resolve: {
            rubriqueProfil: RubriqueProfilResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.rubriqueProfil.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: RubriqueProfilUpdateComponent,
        resolve: {
            rubriqueProfil: RubriqueProfilResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.rubriqueProfil.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: RubriqueProfilUpdateComponent,
        resolve: {
            rubriqueProfil: RubriqueProfilResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.rubriqueProfil.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rubriqueProfilPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: RubriqueProfilDeletePopupComponent,
        resolve: {
            rubriqueProfil: RubriqueProfilResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEcoleApp.rubriqueProfil.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
