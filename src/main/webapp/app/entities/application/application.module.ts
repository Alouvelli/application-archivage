import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestionEcoleSharedModule } from 'app/shared';
import {
    ApplicationComponent,
    ApplicationDetailComponent,
    ApplicationUpdateComponent,
    ApplicationDeletePopupComponent,
    ApplicationDeleteDialogComponent,
    applicationRoute,
    applicationPopupRoute
} from './';
import {GestionEcoleEcoleModule} from "../ecole/ecole.module";

const ENTITY_STATES = [...applicationRoute, ...applicationPopupRoute];

@NgModule({
    imports: [GestionEcoleSharedModule,GestionEcoleEcoleModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ApplicationComponent,
        ApplicationDetailComponent,
        ApplicationUpdateComponent,
        ApplicationDeleteDialogComponent,
        ApplicationDeletePopupComponent
    ],
    exports: [
        ApplicationComponent,
        ApplicationDetailComponent,
        ApplicationUpdateComponent,
        ApplicationDeleteDialogComponent,
        ApplicationDeletePopupComponent
    ],
    entryComponents: [ApplicationComponent, ApplicationUpdateComponent, ApplicationDeleteDialogComponent, ApplicationDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEcoleApplicationModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
