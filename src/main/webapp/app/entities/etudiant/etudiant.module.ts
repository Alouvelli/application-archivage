import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestionEcoleSharedModule } from 'app/shared';
import {
    EtudiantComponent,
    EtudiantDetailComponent,
    EtudiantUpdateComponent,
    EtudiantDeletePopupComponent,
    EtudiantDeleteDialogComponent,
    etudiantRoute,
    etudiantPopupRoute
} from './';

const ENTITY_STATES = [...etudiantRoute, ...etudiantPopupRoute];

@NgModule({
    imports: [GestionEcoleSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EtudiantComponent,
        EtudiantDetailComponent,
        EtudiantUpdateComponent,
        EtudiantDeleteDialogComponent,
        EtudiantDeletePopupComponent
    ],
    entryComponents: [EtudiantComponent, EtudiantUpdateComponent, EtudiantDeleteDialogComponent, EtudiantDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEcoleEtudiantModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
