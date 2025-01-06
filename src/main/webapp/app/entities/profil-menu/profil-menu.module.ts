import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestionEcoleSharedModule } from 'app/shared';
import {
    ProfilMenuComponent,
    ProfilMenuDetailComponent,
    ProfilMenuUpdateComponent,
    ProfilMenuDeletePopupComponent,
    ProfilMenuDeleteDialogComponent,
    profilMenuRoute,
    profilMenuPopupRoute
} from './';

const ENTITY_STATES = [...profilMenuRoute, ...profilMenuPopupRoute];

@NgModule({
    imports: [GestionEcoleSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProfilMenuComponent,
        ProfilMenuDetailComponent,
        ProfilMenuUpdateComponent,
        ProfilMenuDeleteDialogComponent,
        ProfilMenuDeletePopupComponent
    ],
    entryComponents: [ProfilMenuComponent, ProfilMenuUpdateComponent, ProfilMenuDeleteDialogComponent, ProfilMenuDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEcoleProfilMenuModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
