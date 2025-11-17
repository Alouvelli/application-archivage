import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestionEcoleSharedModule } from 'app/shared';
import {
    NiveauComponent,
    NiveauDetailComponent,
    NiveauUpdateComponent,
    NiveauDeletePopupComponent,
    NiveauDeleteDialogComponent,
    niveauRoute,
    niveauPopupRoute
} from './';

const ENTITY_STATES = [...niveauRoute, ...niveauPopupRoute];

@NgModule({
    imports: [GestionEcoleSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [NiveauComponent, NiveauDetailComponent, NiveauUpdateComponent, NiveauDeleteDialogComponent, NiveauDeletePopupComponent],
    entryComponents: [NiveauComponent, NiveauUpdateComponent, NiveauDeleteDialogComponent, NiveauDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEcoleNiveauModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
