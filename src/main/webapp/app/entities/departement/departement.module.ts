import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestionEcoleSharedModule } from 'app/shared';
import {
    DepartementComponent,
    DepartementDetailComponent,
    DepartementUpdateComponent,
    DepartementDeletePopupComponent,
    DepartementDeleteDialogComponent,
    departementRoute,
    departementPopupRoute
} from './';
import {DepartementFiliereComponent} from "./departementFiliere.component";
import {DepartementClasseComponent} from "./departementClasse.component";

const ENTITY_STATES = [...departementRoute, ...departementPopupRoute];

@NgModule({
    imports: [GestionEcoleSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DepartementComponent,
        DepartementDetailComponent,
        DepartementUpdateComponent,
        DepartementFiliereComponent,
        DepartementClasseComponent,
        DepartementDeleteDialogComponent,
        DepartementDeletePopupComponent
    ],
    entryComponents: [DepartementComponent, DepartementUpdateComponent, DepartementDeleteDialogComponent, DepartementDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEcoleDepartementModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
