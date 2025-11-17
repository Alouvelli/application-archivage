import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IEcole } from '../ecole.model';

@Component({
  selector: 'jhi-ecole-detail',
  templateUrl: './ecole-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class EcoleDetailComponent {
  ecole = input<IEcole | null>(null);

  previousState(): void {
    window.history.back();
  }
}
