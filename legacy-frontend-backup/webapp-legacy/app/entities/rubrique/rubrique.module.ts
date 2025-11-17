import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestionEcoleSharedModule } from 'app/shared';
import {
    RubriqueComponent,
    RubriqueDetailComponent,
    RubriqueUpdateComponent,
    RubriqueDeletePopupComponent,
    RubriqueDeleteDialogComponent,
    rubriqueRoute,
    rubriquePopupRoute
} from './';

const ENTITY_STATES = [...rubriqueRoute, ...rubriquePopupRoute];

@NgModule({
    imports: [GestionEcoleSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RubriqueComponent,
        RubriqueDetailComponent,
        RubriqueUpdateComponent,
        RubriqueDeleteDialogComponent,
        RubriqueDeletePopupComponent
    ],
    entryComponents: [RubriqueComponent, RubriqueUpdateComponent, RubriqueDeleteDialogComponent, RubriqueDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEcoleRubriqueModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
