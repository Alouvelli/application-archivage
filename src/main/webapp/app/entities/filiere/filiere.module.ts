import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestionEcoleSharedModule } from 'app/shared';
import {
    FiliereComponent,
    FiliereDetailComponent,
    FiliereUpdateComponent,
    FiliereDeletePopupComponent,
    FiliereDeleteDialogComponent,
    filiereRoute,
    filierePopupRoute
} from './';
import {FiliereClasseComponent} from "./filiere-Classe.component";
import {DocumentClasseComponent} from "./document-Classe.component";

const ENTITY_STATES = [...filiereRoute, ...filierePopupRoute];

@NgModule({
    imports: [GestionEcoleSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FiliereComponent,
        FiliereDetailComponent,
        FiliereUpdateComponent,
        FiliereClasseComponent,
        DocumentClasseComponent,
        FiliereDeleteDialogComponent,
        FiliereDeletePopupComponent
    ],
    entryComponents: [FiliereComponent, FiliereUpdateComponent, FiliereDeleteDialogComponent, FiliereDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEcoleFiliereModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
