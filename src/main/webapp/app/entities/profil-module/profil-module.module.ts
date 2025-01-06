import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestionEcoleSharedModule } from 'app/shared';
import {
    ProfilModuleComponent,
    ProfilModuleDetailComponent,
    ProfilModuleUpdateComponent,
    ProfilModuleDeletePopupComponent,
    ProfilModuleDeleteDialogComponent,
    profilModuleRoute,
    profilModulePopupRoute
} from './';

const ENTITY_STATES = [...profilModuleRoute, ...profilModulePopupRoute];

@NgModule({
    imports: [GestionEcoleSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProfilModuleComponent,
        ProfilModuleDetailComponent,
        ProfilModuleUpdateComponent,
        ProfilModuleDeleteDialogComponent,
        ProfilModuleDeletePopupComponent
    ],
    entryComponents: [
        ProfilModuleComponent,
        ProfilModuleUpdateComponent,
        ProfilModuleDeleteDialogComponent,
        ProfilModuleDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEcoleProfilModuleModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
