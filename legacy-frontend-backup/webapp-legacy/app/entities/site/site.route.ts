import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ResolveFn, Routes, Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISite, Site } from 'app/shared/model/site.model';
import { SiteService } from './site.service';
import { SiteComponent } from './site.component';
import { SiteDetailComponent } from './site-detail.component';
import { SiteUpdateComponent } from './site-update.component';

const siteResolve: ResolveFn<ISite> = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];
  if (id) {
    const service = inject(SiteService);
    const router = inject(Router);
    return service.find(id).pipe(
      mergeMap((response: HttpResponse<ISite>) => {
        const site = response.body;
        if (site) {
          return of(site);
        }
        router.navigate(['404']);
        return EMPTY;
      })
    );
  }
  return of(new Site());
};

export const siteRoute: Routes = [
  {
    path: '',
    component: SiteComponent,
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gestionEcoleApp.site.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':ajouter/:modifier/:supprimer/:voir',
    component: SiteComponent,
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gestionEcoleApp.site.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SiteDetailComponent,
    resolve: {
      site: siteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestionEcoleApp.site.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SiteUpdateComponent,
    resolve: {
      site: siteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestionEcoleApp.site.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SiteUpdateComponent,
    resolve: {
      site: siteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gestionEcoleApp.site.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
