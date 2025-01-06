import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestionEcoleSharedModule } from 'app/shared';
import {
    DocumentexcelComponent,
    DocumentexcelDetailComponent,
    DocumentexcelUpdateComponent,
    DocumentexcelDeletePopupComponent,
    DocumentexcelDeleteDialogComponent,
    documentexcelRoute,
    documentexcelPopupRoute
} from './';

const ENTITY_STATES = [...documentexcelRoute, ...documentexcelPopupRoute];

@NgModule({
    imports: [GestionEcoleSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DocumentexcelComponent,
        DocumentexcelDetailComponent,
        DocumentexcelUpdateComponent,
        DocumentexcelDeleteDialogComponent,
        DocumentexcelDeletePopupComponent
    ],
    entryComponents: [
        DocumentexcelComponent,
        DocumentexcelUpdateComponent,
        DocumentexcelDeleteDialogComponent,
        DocumentexcelDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEcoleDocumentexcelModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
