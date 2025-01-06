import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestionEcoleSharedModule } from 'app/shared';
import {
    ProfilComponent,
    ProfilDetailComponent,
    ProfilUpdateComponent,
    ProfilDeletePopupComponent,
    ProfilDeleteDialogComponent,
    profilRoute,
    profilPopupRoute
} from './';

const ENTITY_STATES = [...profilRoute, ...profilPopupRoute];

@NgModule({
    imports: [GestionEcoleSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ProfilComponent, ProfilDetailComponent, ProfilUpdateComponent, ProfilDeleteDialogComponent, ProfilDeletePopupComponent],
    entryComponents: [ProfilComponent, ProfilUpdateComponent, ProfilDeleteDialogComponent, ProfilDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEcoleProfilModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
