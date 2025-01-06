import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestionEcoleSharedModule } from 'app/shared';
import {
    TypeDocumentComponent,
    TypeDocumentDetailComponent,
    TypeDocumentUpdateComponent,
    TypeDocumentDeletePopupComponent,
    TypeDocumentDeleteDialogComponent,
    typeDocumentRoute,
    typeDocumentPopupRoute
} from './';

const ENTITY_STATES = [...typeDocumentRoute, ...typeDocumentPopupRoute];

@NgModule({
    imports: [GestionEcoleSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TypeDocumentComponent,
        TypeDocumentDetailComponent,
        TypeDocumentUpdateComponent,
        TypeDocumentDeleteDialogComponent,
        TypeDocumentDeletePopupComponent
    ],
    entryComponents: [
        TypeDocumentComponent,
        TypeDocumentUpdateComponent,
        TypeDocumentDeleteDialogComponent,
        TypeDocumentDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEcoleTypeDocumentModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
