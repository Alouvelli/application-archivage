import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { employeRoute } from './employe.route';

@NgModule({
  imports: [RouterModule.forChild(employeRoute)]
})
export class GestionEcoleEmployeModule {}
