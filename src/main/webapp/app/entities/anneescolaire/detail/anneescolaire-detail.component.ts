import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IAnneescolaire } from '../anneescolaire.model';

@Component({
  selector: 'jhi-anneescolaire-detail',
  templateUrl: './anneescolaire-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class AnneescolaireDetailComponent {
  anneescolaire = input<IAnneescolaire | null>(null);

  previousState(): void {
    window.history.back();
  }
}
