import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IRubriqueProfil } from '../rubrique-profil.model';

@Component({
  selector: 'jhi-rubrique-profil-detail',
  templateUrl: './rubrique-profil-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class RubriqueProfilDetailComponent {
  rubriqueProfil = input<IRubriqueProfil | null>(null);

  previousState(): void {
    window.history.back();
  }
}
