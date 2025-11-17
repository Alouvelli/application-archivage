import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { classeRoute } from './classe.route';

@NgModule({
  imports: [RouterModule.forChild(classeRoute)]
})
export class GestionEcoleClasseModule {}
