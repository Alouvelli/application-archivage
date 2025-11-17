import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { FormatMediumDatePipe } from 'app/shared/date';
import { IInscription } from '../inscription.model';

@Component({
  selector: 'jhi-inscription-detail',
  templateUrl: './inscription-detail.component.html',
  imports: [SharedModule, RouterModule, FormatMediumDatePipe],
})
export class InscriptionDetailComponent {
  inscription = input<IInscription | null>(null);

  previousState(): void {
    window.history.back();
  }
}
