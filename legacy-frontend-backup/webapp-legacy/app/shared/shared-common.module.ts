import { NgModule } from '@angular/core';

import {
    GestionEcoleSharedLibsModule,
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent
} from './';
import TranslateDirective from './language/translate.directive';

@NgModule({
    imports: [GestionEcoleSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent, TranslateDirective],
    exports: [GestionEcoleSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent, TranslateDirective]
})
export class GestionEcoleSharedCommonModule {}
