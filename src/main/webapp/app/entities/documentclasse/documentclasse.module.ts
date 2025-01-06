import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestionEcoleSharedModule } from 'app/shared';
import {
    DocumentclasseComponent,
    DocumentclasseDetailComponent,
    DocumentclasseUpdateComponent,
    DocumentclasseDeletePopupComponent,
    DocumentclasseDeleteDialogComponent,
    documentclasseRoute,
    documentclassePopupRoute
} from './';
import {EtudiantPipe} from "./etudiant.pipe";
import {Documentclasse2Component} from "./documentclasse2.component";
import {DocumentclasseUpdate2Component} from "./documentclasse-update2.component";

const ENTITY_STATES = [...documentclasseRoute, ...documentclassePopupRoute];

@NgModule({
    imports: [GestionEcoleSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DocumentclasseComponent,
        DocumentclasseDetailComponent,
        DocumentclasseUpdateComponent,
        DocumentclasseUpdate2Component,
        DocumentclasseDeleteDialogComponent,
        Documentclasse2Component,
        DocumentclasseDeletePopupComponent,
        EtudiantPipe
    ],
    entryComponents: [
        DocumentclasseUpdate2Component,
        DocumentclasseComponent,
        DocumentclasseUpdateComponent,
        DocumentclasseDeleteDialogComponent,
        DocumentclasseDeletePopupComponent,

    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEcoleDocumentclasseModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
