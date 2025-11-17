import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { anneescolaireRoute } from './anneescolaire.route';

@NgModule({
  imports: [RouterModule.forChild(anneescolaireRoute)]
})
export class GestionEcoleAnneescolaireModule {}
