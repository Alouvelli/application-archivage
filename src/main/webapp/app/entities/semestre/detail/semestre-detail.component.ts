import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ISemestre } from '../semestre.model';

@Component({
  selector: 'jhi-semestre-detail',
  templateUrl: './semestre-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class SemestreDetailComponent {
  semestre = input<ISemestre | null>(null);

  previousState(): void {
    window.history.back();
  }
}
