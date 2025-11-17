import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestionEcoleSharedModule } from 'app/shared';
import {
    RubriqueProfilComponent,
    RubriqueProfilDetailComponent,
    RubriqueProfilUpdateComponent,
    RubriqueProfilDeletePopupComponent,
    RubriqueProfilDeleteDialogComponent,
    rubriqueProfilRoute,
    rubriqueProfilPopupRoute
} from './';

const ENTITY_STATES = [...rubriqueProfilRoute, ...rubriqueProfilPopupRoute];

@NgModule({
    imports: [GestionEcoleSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RubriqueProfilComponent,
        RubriqueProfilDetailComponent,
        RubriqueProfilUpdateComponent,
        RubriqueProfilDeleteDialogComponent,
        RubriqueProfilDeletePopupComponent
    ],
    entryComponents: [
        RubriqueProfilComponent,
        RubriqueProfilUpdateComponent,
        RubriqueProfilDeleteDialogComponent,
        RubriqueProfilDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEcoleRubriqueProfilModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
