import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestionEcoleSharedModule } from 'app/shared';
import {
    InscriptionComponent,
    InscriptionDetailComponent,
    InscriptionUpdateComponent,
    InscriptionDeletePopupComponent,
    InscriptionDeleteDialogComponent,
    inscriptionRoute,
    inscriptionPopupRoute
} from './';
import {GestionEcoleEtudiantModule} from "../etudiant/etudiant.module";
import {EtudiantPipe} from "./etudiant.pipe";
import {InscriptionUpdateOuiComponent, InscriptionUpdateOuiComponentComponent} from "./inscription-updateOui.component";
import {InscriptionUpdateVisualiserComponent} from "./inscription-updateVisualiser.component";
import {InscriptionClasseComponent} from "./inscriptionClasse.component";

const ENTITY_STATES = [...inscriptionRoute, ...inscriptionPopupRoute];

@NgModule({
    imports: [GestionEcoleSharedModule,RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InscriptionComponent,
        InscriptionDetailComponent,
        InscriptionClasseComponent,
        InscriptionUpdateComponent,
        InscriptionUpdateOuiComponent,
        InscriptionUpdateVisualiserComponent,
        InscriptionDeleteDialogComponent,
        InscriptionDeletePopupComponent,
        EtudiantPipe

    ],
    exports: [
        InscriptionClasseComponent,
        InscriptionComponent,
        InscriptionDetailComponent,
        InscriptionUpdateComponent,
        InscriptionUpdateOuiComponent,
        InscriptionUpdateVisualiserComponent,
        InscriptionDeleteDialogComponent,
        InscriptionDeletePopupComponent,
        EtudiantPipe
    ],
    entryComponents: [InscriptionComponent, InscriptionUpdateComponent, InscriptionDeleteDialogComponent, InscriptionDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEcoleInscriptionModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
