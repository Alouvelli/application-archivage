import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestionEcoleSharedModule } from 'app/shared';
import {
    AnneescolaireComponent,
    AnneescolaireDetailComponent,
    AnneescolaireUpdateComponent,
    AnneescolaireDeletePopupComponent,
    AnneescolaireDeleteDialogComponent,
    anneescolaireRoute,
    anneescolairePopupRoute
} from './';

const ENTITY_STATES = [...anneescolaireRoute, ...anneescolairePopupRoute];

@NgModule({
    imports: [GestionEcoleSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AnneescolaireComponent,
        AnneescolaireDetailComponent,
        AnneescolaireUpdateComponent,
        AnneescolaireDeleteDialogComponent,
        AnneescolaireDeletePopupComponent
    ],
    entryComponents: [
        AnneescolaireComponent,
        AnneescolaireUpdateComponent,
        AnneescolaireDeleteDialogComponent,
        AnneescolaireDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEcoleAnneescolaireModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
