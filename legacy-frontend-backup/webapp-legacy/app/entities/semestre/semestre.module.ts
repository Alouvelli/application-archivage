import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestionEcoleSharedModule } from 'app/shared';
import {
    SemestreComponent,
    SemestreDetailComponent,
    SemestreUpdateComponent,
    SemestreDeletePopupComponent,
    SemestreDeleteDialogComponent,
    semestreRoute,
    semestrePopupRoute
} from './';

const ENTITY_STATES = [...semestreRoute, ...semestrePopupRoute];

@NgModule({
    imports: [GestionEcoleSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SemestreComponent,
        SemestreDetailComponent,
        SemestreUpdateComponent,
        SemestreDeleteDialogComponent,
        SemestreDeletePopupComponent
    ],
    entryComponents: [SemestreComponent, SemestreUpdateComponent, SemestreDeleteDialogComponent, SemestreDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEcoleSemestreModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
