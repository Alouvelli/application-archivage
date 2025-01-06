import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestionEcoleSharedModule } from 'app/shared';
import {
    EmployeComponent,
    EmployeDetailComponent,
    EmployeUpdateComponent,
    EmployeDeletePopupComponent,
    EmployeDeleteDialogComponent,
    employeRoute,
    employePopupRoute
} from './';

const ENTITY_STATES = [...employeRoute, ...employePopupRoute];

@NgModule({
    imports: [GestionEcoleSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EmployeComponent,
        EmployeDetailComponent,
        EmployeUpdateComponent,
        EmployeDeleteDialogComponent,
        EmployeDeletePopupComponent
    ],
    entryComponents: [EmployeComponent, EmployeUpdateComponent, EmployeDeleteDialogComponent, EmployeDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEcoleEmployeModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
