import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IRubrique } from '../rubrique.model';

@Component({
  selector: 'jhi-rubrique-detail',
  templateUrl: './rubrique-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class RubriqueDetailComponent {
  rubrique = input<IRubrique | null>(null);

  previousState(): void {
    window.history.back();
  }
}
