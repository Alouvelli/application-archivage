import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestionEcoleSharedModule } from 'app/shared';
import {
    EcoleComponent,
    EcoleDetailComponent,
    EcoleUpdateComponent,
    EcoleDeletePopupComponent,
    EcoleDeleteDialogComponent,
    ecoleRoute,
    ecolePopupRoute
} from './';

const ENTITY_STATES = [...ecoleRoute, ...ecolePopupRoute];

@NgModule({
    imports: [GestionEcoleSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [EcoleComponent, EcoleDetailComponent, EcoleUpdateComponent, EcoleDeleteDialogComponent, EcoleDeletePopupComponent],
    exports: [EcoleComponent, EcoleDetailComponent, EcoleUpdateComponent, EcoleDeleteDialogComponent, EcoleDeletePopupComponent],
    entryComponents: [EcoleComponent, EcoleUpdateComponent, EcoleDeleteDialogComponent, EcoleDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEcoleEcoleModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
