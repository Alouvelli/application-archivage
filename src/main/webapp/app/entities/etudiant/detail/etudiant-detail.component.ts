import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IEtudiant } from '../etudiant.model';

@Component({
  selector: 'jhi-etudiant-detail',
  templateUrl: './etudiant-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class EtudiantDetailComponent {
  etudiant = input<IEtudiant | null>(null);

  previousState(): void {
    window.history.back();
  }
}
