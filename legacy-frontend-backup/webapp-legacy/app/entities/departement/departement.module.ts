import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { departementRoute } from './departement.route';

@NgModule({
  imports: [RouterModule.forChild(departementRoute)]
})
export class GestionEcoleDepartementModule {}
