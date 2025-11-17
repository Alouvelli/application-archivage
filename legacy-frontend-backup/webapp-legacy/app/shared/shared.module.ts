import { NgModule } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { GestionEcoleSharedLibsModule, GestionEcoleSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
    imports: [GestionEcoleSharedLibsModule, GestionEcoleSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    exports: [GestionEcoleSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective]
})
export class GestionEcoleSharedModule {}
