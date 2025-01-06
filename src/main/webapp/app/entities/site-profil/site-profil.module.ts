import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestionEcoleSharedModule } from 'app/shared';
import {
    SiteProfilComponent,
    SiteProfilDetailComponent,
    SiteProfilUpdateComponent,
    SiteProfilDeletePopupComponent,
    SiteProfilDeleteDialogComponent,
    siteProfilRoute,
    siteProfilPopupRoute
} from './';

const ENTITY_STATES = [...siteProfilRoute, ...siteProfilPopupRoute];

@NgModule({
    imports: [GestionEcoleSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SiteProfilComponent,
        SiteProfilDetailComponent,
        SiteProfilUpdateComponent,
        SiteProfilDeleteDialogComponent,
        SiteProfilDeletePopupComponent
    ],
    entryComponents: [SiteProfilComponent, SiteProfilUpdateComponent, SiteProfilDeleteDialogComponent, SiteProfilDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEcoleSiteProfilModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
