import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestionEcoleSharedModule } from 'app/shared';
import {
    ClasseComponent,
    ClasseDetailComponent,
    ClasseUpdateComponent,
    ClasseDeletePopupComponent,
    ClasseDeleteDialogComponent,
    classeRoute,
    classePopupRoute
} from './';

const ENTITY_STATES = [...classeRoute, ...classePopupRoute];

@NgModule({
    imports: [GestionEcoleSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ClasseComponent, ClasseDetailComponent, ClasseUpdateComponent, ClasseDeleteDialogComponent, ClasseDeletePopupComponent],
    entryComponents: [ClasseComponent, ClasseUpdateComponent, ClasseDeleteDialogComponent, ClasseDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEcoleClasseModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
