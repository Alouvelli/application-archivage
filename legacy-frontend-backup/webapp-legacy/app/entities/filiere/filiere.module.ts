import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { filiereRoute } from './filiere.route';

@NgModule({
  imports: [RouterModule.forChild(filiereRoute)]
})
export class GestionEcoleFiliereModule {}
