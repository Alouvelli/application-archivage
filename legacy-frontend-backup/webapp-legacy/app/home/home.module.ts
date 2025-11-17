import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEcoleSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';

@NgModule({
    imports: [GestionEcoleSharedModule, RouterModule.forChild([HOME_ROUTE])],
    declarations: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEcoleHomeModule {}
